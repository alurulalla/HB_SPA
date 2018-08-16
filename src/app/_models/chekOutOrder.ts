import { ItemsOrder } from './itemsOrder';

export interface CheckOutOrder {
    userId?: number;
    items?: ItemsOrder[];
    price?: number;
}
