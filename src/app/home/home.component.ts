import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private route: Router, public authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
  }

  onOrderNow() {
    this.route.navigate(['/ordernow']);
  }

  onSignUp() {
    this.route.navigate(['/signup']);
  }

}
