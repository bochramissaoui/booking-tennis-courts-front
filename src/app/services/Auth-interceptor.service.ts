import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from './Auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.currentUserSubject.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user || !user.token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + user.token
          ),
          withCredentials: true, // Ensure this is included
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
