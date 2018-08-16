import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private route: Router,
    private alertifyService: AlertifyService) { }

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