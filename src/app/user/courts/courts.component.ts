import { Component, OnInit } from '@angular/core';
import { CourtService } from 'src/app/services/Court.service';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css'],
})
export class CourtsComponent implements OnInit {
  courts: any[] = [];
  selectedCourt: any = null;
  selectedHours: any[] = [];
  availableHours: any[] = [];
  visibleDays: { name: string; date: Date; selected: boolean }[] = [];
  currentDayIndex = 0;

  constructor(private courtService: CourtService) {}

  ngOnInit() {
    this.loadCourts();
    this.initializeDatePicker();
  }

  loadCourts() {
    this.courtService.getAllCourts().subscribe(
      (data) => {
        this.courts = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des courts:', error);
      }
    );
  }

  openModal(court: any) {
    this.selectedCourt = court;
    this.generateAvailableHours(court.reservations || []);
    this.selectedHours = [];
  }

  closeModal() {
    this.selectedCourt = null;
  }

  initializeDatePicker() {
    const today = new Date();
    this.visibleDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        name: date.toLocaleString('fr', { weekday: 'short' }),
        date,
        selected: i === 0,
      };
    });
  }

  isSelectedDay(day: any): boolean {
    return day.selected;
  }

  selectDay(day: any) {
    this.visibleDays.forEach((d) => (d.selected = false));
    day.selected = true;
    this.currentDayIndex = this.visibleDays.indexOf(day);
    this.selectedHours = [];
    this.generateAvailableHours(this.selectedCourt?.reservations || []);
  }

  previousDay() {
    if (this.currentDayIndex > 0) {
      this.selectDay(this.visibleDays[--this.currentDayIndex]);
    }
  }

  nextDay() {
    if (this.currentDayIndex < this.visibleDays.length - 1) {
      this.selectDay(this.visibleDays[++this.currentDayIndex]);
    }
  }

  generateAvailableHours(reservations: any[]) {
    const startHour = 8; // Court opens at 8 AM
    const endHour = 20; // Court closes at 8 PM
    const selectedDate = this.visibleDays[this.currentDayIndex].date;

    const allHours: { time: string; reserved: boolean; duration?: number }[] =
      [];

    for (let hour = startHour; hour < endHour; hour++) {
      const hourString = `${hour}:00`;

      // Check for reservations on the current day only
      const isReserved = reservations.some((reservation: any) => {
        const reservationDate = new Date(reservation.startTime).toDateString();
        const currentDate = selectedDate.toDateString();
        const reservationStart = new Date(reservation.startTime).getHours() + 1;
        const reservationDuration = reservation.duration || 1; // Default duration is 1 hour
        const reservationEnd = reservationStart + reservationDuration;
        return (
          currentDate === reservationDate &&
          hour >= reservationStart &&
          hour < reservationEnd
        );
      });

      allHours.push({ time: hourString, reserved: isReserved });
    }

    this.availableHours = allHours;
  }

  isHourSelected(hour: any): boolean {
    return this.selectedHours.some((h) => h.time === hour.time);
  }

  toggleHourSelection(hour: any) {
    if (this.selectedHours.length >= 4 && !this.isHourSelected(hour)) {
      alert('Vous ne pouvez pas réserver plus de 4 heures.');
      return;
    }
    if (this.isHourSelected(hour)) {
      // If already selected, remove it
      this.selectedHours = this.selectedHours.filter(
        (h) => h.time !== hour.time
      );
    } else {
      // Add the selected hour
      this.selectedHours.push(hour);
    }
  }

  confirmReservation() {
    const selectedTimes = this.selectedHours.map((h) =>
      parseInt(h.time.split(':')[0])
    );
    const startHour = Math.min(...selectedTimes);
    const duration = this.selectedHours.length;

    const selectedDay = this.visibleDays[this.currentDayIndex];
    const startTime = new Date(
      selectedDay.date.getFullYear(),
      selectedDay.date.getMonth(),
      selectedDay.date.getDate(),
      startHour
    );

    const reservation = {
      court: { id: this.selectedCourt.id },
      startTime: startTime,
      duration: duration,
    };

    this.courtService.reserveCourt(reservation).subscribe(
      () => {
        alert('Réservation réussie !');
        this.closeModal();
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de la réservation :', error);
        alert('Erreur lors de la réservation.');
      }
    );
  }
}
