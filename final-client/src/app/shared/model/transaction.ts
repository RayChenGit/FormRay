import {Card} from './card';

export class Transaction {
  id?: number;
  date?: string;
  time?: string;
  amount?: number;
  description?: string;
  card?: Card;
  canceled?: boolean;
  charged?: boolean;
  rewarded?: boolean;
  disputed?: boolean;
}
