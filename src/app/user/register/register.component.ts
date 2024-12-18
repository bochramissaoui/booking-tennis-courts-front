import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error = '';
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get getRegisterForm(): any {
    return this.registerForm.controls;
  }

  onRegister(): void {
    this.submitted = true;
    this.error = '';

    if (this.registerForm.invalid) {
      return;
    }

    const user = {
      username: this.getRegisterForm.username.value.toLowerCase(),
      password: this.getRegisterForm.password.value,
    };

    this.authService.register(user).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (errorRequest) => {
        this.submitted = false;
        this.error = errorRequest.error;
        console.log(errorRequest);
      }
    );
  }
}
