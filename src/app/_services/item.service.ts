import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../_models/Item';
import { map } from 'rxjs/operators';

@Injectable()
export class ItemService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: HttpClient) {}

    getItems() {
        return this.authHttp.get<Item[]>(this.baseUrl + 'items');
    }
}
