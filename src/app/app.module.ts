import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './user/home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/Auth-interceptor.service';
import { CourtsComponent } from './user/courts/courts.component';
import { AuthComponent } from './admin/auth/auth.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { CourtListComponent } from './admin/court-list/court-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    CourtsComponent,
    AuthComponent,
    UserListComponent,
    CourtListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
