import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Auth.service';
import { map, take } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.currentUserSubject.pipe(
      take(1),
      map((user) => {
        if (!user) {
          return this.router.createUrlTree(['login']);
        }

        const token = this.authService.getToken();
        if (!token) {
          return this.router.createUrlTree(['login']);
        }

        const decodedToken: any = jwtDecode(token);
        const requiredRole = route.data['roles'];

        if (requiredRole && requiredRole.includes(decodedToken.role)) {
          return true;
        } else {
          return this.router.createUrlTree(['']);
        }
      })
    );
  }
}
