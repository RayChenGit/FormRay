import {CardType} from './card-type';
import {Transaction} from './transaction';

export class Card {
  id?: number;
  cardnumber?: string;
  cardid?: string;
  postedcharge?: number;
  totalbalance?: number;
  cardlimit?: number;

  cardType?: CardType;
  transactions?: Transaction[];
}
