import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './Local-storage.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject: BehaviorSubject<{ token: string }>;
  private apiUrl = '/api/auth';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    public router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<{
      token: string;
    }>(JSON.parse(localStorage.getItem('currentUser')!));
  }

  register(user: User): Observable<any> {
    return this.http.post(
      environment.APP_BASE_URL + this.apiUrl + '/register',
      user
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(environment.APP_BASE_URL + this.apiUrl + '/login', {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.clear();
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  autoLogin(): void {
    const userData: {
      token: string;
    } = JSON.parse(this.localStorageService.getItem('currentUser'));
    if (!userData) {
      this.localStorageService.clear();
      return;
    }
    const token = JSON.parse(
      this.localStorageService.getItem('currentUser')
    ).token;
  }

  getToken(): string | null {
    const userDataString = localStorage.getItem('currentUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData ? userData.token : null;
    }
    return null;
  }

  logout(): any {
    this.localStorageService.clear();
    this.currentUserSubject.next(null as any);
    return of({ success: false });
  }
}
