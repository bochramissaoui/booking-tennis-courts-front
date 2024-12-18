import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
  private baseUl = 'http://localhost:8080/api/auth/find';
  getUserDetails(username: string): Observable<any> {
    return this.http.get(`${this.baseUl}/${username}`);
  }
  enableUser(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/enable/${userId}`, {});
  }
}
