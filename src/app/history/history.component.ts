import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HistoryService } from '../_services/history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryDetails } from '../_models/historyDetails';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyDetails: HistoryDetails[] = [];
  constructor(private authService: AuthService,
              private historyService: HistoryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.GetUserOrderHistory();
  }

  GetUserOrderHistory() {
    this.historyService.getUserOrderHistory(this.authService.decodedToken.nameid)
    .subscribe(
      (data: HistoryDetails[]) => {
        this.historyDetails = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onOrderNow() {
    this.router.navigate(['/ordernow']);
  }

}
