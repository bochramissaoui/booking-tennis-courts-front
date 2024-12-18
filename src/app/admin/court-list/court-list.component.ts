import { Component, OnInit } from '@angular/core';
import { Court } from 'src/app/models/court.model';
import { CourtService } from 'src/app/services/Court.service';

@Component({
  selector: 'app-court-list',
  templateUrl: './court-list.component.html',
  styleUrls: ['./court-list.component.css'],
})
export class CourtListComponent implements OnInit {
  courts: Court[] = [];
  selectedCourt: Court | null = null;
  isAddCourtModalOpen: boolean = false;
  isReservationModalOpen: boolean = false;
  newCourt: Court = {
    name: '',
    img: '',
    description: '',
    adresse: '',
    prixParHeure: '',
    available: false,
  };

  constructor(private courtService: CourtService) {}

  ngOnInit(): void {
    this.loadCourts();
  }

  loadCourts(): void {
    this.courtService.getAllCourts().subscribe((data) => {
      this.courts = data;
    });
  }

  deleteCourt(courtId: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce court ?')) {
      this.courtService.deleteCourt(courtId).subscribe(() => {
        this.loadCourts();
      });
    }
  }

  viewReservations(court: Court): void {
    this.selectedCourt = court;
    this.isReservationModalOpen = true;

    if (this.selectedCourt && this.selectedCourt.reservations) {
      this.selectedCourt.reservations = this.selectedCourt.reservations.map(
        (reservation) => {
          return {
            ...reservation,
            startTime: new Date(
              new Date(reservation.startTime).setHours(
                new Date(reservation.startTime).getHours() + 1
              )
            ),
          };
        }
      );
    }
  }

  closeReservationModal(): void {
    this.isReservationModalOpen = false;
    this.selectedCourt = null;
  }

  openAddCourtModal(): void {
    this.isAddCourtModalOpen = true;
  }

  closeAddCourtModal(): void {
    this.isAddCourtModalOpen = false;
    this.newCourt = {
      name: '',
      img: '',
      description: '',
      adresse: '',
      prixParHeure: '',
      available: true,
    };
  }

  addCourt(): void {
    this.courtService.addCourt(this.newCourt).subscribe(() => {
      this.closeAddCourtModal();
      this.loadCourts();
    });
  }
}
