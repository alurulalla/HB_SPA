import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { FormGroup, FormBuilder, Validators, EmailValidator} from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      mobile: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]+')
      ]],
      email: ['', [Validators.required, Validators.email]]
    }, { validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          console.log('Registration Successful');
        }, (error) => {
          console.log('Registraion Failed');
        }, () => {
          this.authService.login(this.user).subscribe(
            () => {
              this.router.navigate(['/ordernow']);
            }
          );
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
