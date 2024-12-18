import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  error = '';
  authForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get getFormValue(): any {
    return this.authForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.authForm.invalid) {
      return;
    } else {
      const username = this.getFormValue.username.value.toLowerCase();
      const password = this.getFormValue.password.value;
      this.authService.login(username, password).subscribe(
        (result) => {
          if (result) {
            this.router.navigate(['/courts']);
          }
        },
        (errorRequest) => {
          this.submitted = false;
          this.error = errorRequest.error;
          console.log(errorRequest);
        }
      );
    }
  }
}
