import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService, private route: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      (data) => {
        // this.alertifyService.success('logged in successfully');
        console.log('logged in successfully');
        this.route.navigate(['/ordernow']);
      }, (error) => {
        // this.alertifyService.error('logged in failed');
        console.log('logged in failed');
      }
    );
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.route.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
