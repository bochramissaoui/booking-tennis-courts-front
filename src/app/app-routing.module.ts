import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './user/home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CourtsComponent } from './user/courts/courts.component';
import { AuthGuard } from './services/Auth.guard';
import { AuthComponent } from './admin/auth/auth.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { CourtListComponent } from './admin/court-list/court-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'courts',
    component: CourtsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USER'] },
  },
  {
    path: 'admin/auth',
    component: AuthComponent,
  },
  {
    path: 'admin/users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: 'ADMIN' },
  },
  {
    path: 'admin/courts',
    component: CourtListComponent,
    canActivate: [AuthGuard],
    data: { roles: 'ADMIN' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
