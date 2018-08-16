import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HistoryDetails } from '../_models/historyDetails';

@Injectable()
export class HistoryService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: HttpClient) {}

    getUserOrderHistory(id) {
        return this.authHttp.get<HistoryDetails[]>(this.baseUrl + 'order/' + id);
    }
}
