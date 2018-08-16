import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CheckOutOrder } from '../_models/chekOutOrder';
import { Order } from '../_models/Order';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckOutService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: HttpClient) {}

    CheckOUt(checkOutItems: CheckOutOrder) {
        return this.authHttp.post<Order>(this.baseUrl + 'order/checkout', checkOutItems, { headers: new HttpHeaders()
            .set('Content-Type', 'application/json')});
    }
}
