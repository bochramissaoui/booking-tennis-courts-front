import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Court } from '../models/court.model';
import { Reservation } from '../models/Reservation.model';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  private baseUrl = 'http://localhost:8080/api/courts';

  constructor(private http: HttpClient) {}

  getAllCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.baseUrl}/all`);
  }
  addCourt(court: Court) {
    return this.http.post<Court>(`${this.baseUrl}/add`, court);
  }
  deleteCourt(courtId: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${courtId}`);
  }

  reserveCourt(reservation: Reservation): Observable<any> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser?.token || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      'http://localhost:8080/api/bookings/reserve',
      reservation,
      { headers }
    );
  }
}
