import { Component, OnInit, Input } from '@angular/core';
import { CheckOutOrder } from '../_models/chekOutOrder';
import { AuthService } from '../_services/auth.service';
import { CheckOutService } from '../_services/checkOut.service';
import { Order } from '../_models/Order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input('cartItems') cartItems = [];
  @Input('totalPrice') totalPrice;
  checkOutItems: CheckOutOrder;
  constructor(private authSevice: AuthService, private checkOutService: CheckOutService) {
    this.checkOutItems = {};
  }

  ngOnInit() {
  }

  CheckOut() {
    this.checkOutItems.price = this.totalPrice;
    this.checkOutItems.items = this.cartItems;
    this.checkOutItems.userId = this.authSevice.decodedToken.nameid;
    this.checkOutService.CheckOUt(this.checkOutItems).subscribe(
      (data: Order) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      }
    );
  }
}
