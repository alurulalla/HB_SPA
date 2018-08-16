import { HistoryItemDetails } from './historyItemDetails';

export interface HistoryDetails {
    userId?: number;
    price?: number;
    orderId?: number;
    created?: Date;
    items?: HistoryItemDetails[];
}
