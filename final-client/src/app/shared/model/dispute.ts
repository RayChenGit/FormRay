import {Transaction} from './transaction';

export class Dispute {
  id?: number;
  reason?: string;
  decided?: boolean;
  transaction?: Transaction;
  result?: boolean;
}
