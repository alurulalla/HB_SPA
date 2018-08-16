import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Item } from '../_models/Item';
import { User } from '../_models/User';
import { ItemService } from '../_services/item.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsOrder } from '../_models/itemsOrder';
import { CheckOutOrder } from '../_models/chekOutOrder';
import { AuthService } from '../_services/auth.service';
import { CheckOutService } from '../_services/checkOut.service';
import { Order } from '../_models/Order';

@Component({
  selector: 'app-ordernow',
  templateUrl: './ordernow.component.html',
  styleUrls: ['./ordernow.component.css']
})
export class OrdernowComponent implements OnInit {
  modalRef: BsModalRef;
  items: Item[];
  user: User = JSON.parse(localStorage.getItem('user'));
  itemsOrdered: ItemsOrder;
  orders: CheckOutOrder;
  checkOutOrders: CheckOutOrder;
  itemQuanity = 0;
  totalPrice = 0;
  isUserLoggedIn = false;

  constructor(private itemService: ItemService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private checkOutService: CheckOutService,
    private modalService: BsModalService) {
    this.Reset();
   }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.loggedIn();
    console.log(this.isUserLoggedIn);
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  itemAdd(item: Item) {
    if (! this.isItemAdded(item)) {
      if (! this.isUserLoggedIn) {
        this.checkOutOrders.userId = -1;
      } else {
        this.checkOutOrders.userId = this.authService.decodedToken.nameid;
      }
      // this.orders.userId = 1;
      // this.orders.itemId = item.id;
      this.itemsOrdered.itemId = item.id;
      this.itemsOrdered.itemTypeId = item.itemTypeId;
      this.itemsOrdered.name = item.name;
      this.itemsOrdered.unitPrice = item.price;
      this.itemsOrdered.quantityPrice = item.price;
      this.itemsOrdered.quantity = 1;
      // this.orders.items.push(this.itemsOrdered);
      this.checkOutOrders.items.push(this.itemsOrdered);
      // this.checkOutOrders.items.push(this.orders);
      this.orders = {};
      this.itemsOrdered = {};
      this.orders.items = [];
      this.itemQuanity = 1;
    } else {
      const items = this.checkOutOrders.items.filter(i => i.itemId === item.id);
      items[0].quantity = items[0].quantity + 1;
      items[0].quantityPrice = items[0].quantity * item.price;
      localStorage.removeItem('order');
      this.itemQuanity = items[0].quantity;
    }
    this.GetTotalPrice(item, 1);
    localStorage.setItem('order', JSON.stringify(this.checkOutOrders));
  }

  itemRemove(item: Item) {
    if (this.isItemAdded(item)) {
      const items = this.checkOutOrders.items.filter(i => i.itemId === item.id);
      // const items = this.checkOutOrders.filter(i => i.itemId === item.id);
      items[0].quantity = items[0].quantity - 1;
      items[0].quantityPrice = items[0].quantity * item.price;
      if (items[0].quantity === 0) {
        const indexItem = this.checkOutOrders.items.indexOf(items[0]);
        this.checkOutOrders.items.splice(indexItem, 1);
      }
      this.GetTotalPrice(item, 0);
      localStorage.removeItem('order');
      localStorage.setItem('order', JSON.stringify(this.checkOutOrders));
      // this.orders.quantity = items[0].items[0].quantity;
    }
  }

  isItemAdded(item: Item) {
    const items = this.checkOutOrders.items.filter(i => i.itemId === item.id);
    if (items.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  getQuantity(item: Item) {
    if (this.checkOutOrders.items.length > 0) {
      const items = this.checkOutOrders.items.filter(i => i.itemId === item.id);
      if (items.length === 0) {
        return 0;
      } else {
        return items[0].quantity;
      }
    } else {
      return 0;
    }
  }

  GetTotalPrice(item: Item, value: number) {
    if (value === 1) {
      this.checkOutOrders.price += item.price;
    } else {
      this.checkOutOrders.price -= item.price;
    }
  }

  Reset() {
    this.itemsOrdered = {};
    this.orders = {};
    this.orders.items = [];
    this.checkOutOrders = {};
    this.checkOutOrders.items = [];
    this.checkOutOrders.price = 0;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  CheckOut(template: TemplateRef<any>) {
    if (this.authService.loggedIn()) {
      this.checkOutOrders.userId = this.authService.decodedToken.nameid;
      this.checkOutService.CheckOUt(this.checkOutOrders).subscribe(
        (data: Order) => {
          this.Reset();
          localStorage.removeItem('order');
          this.openModal(template);
        }, (error) => {
          console.log(error);
        }
      );
    }
    }
}
