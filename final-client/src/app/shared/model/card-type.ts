import {Benefit} from './benefit';

export class CardType {
  id?: number;
  name?: string;
  description?: string;
  bonus?: string;
  otherbonus?: string;
  annualfee?: string;
  image?: string;
  benefits?: Benefit[];
}
