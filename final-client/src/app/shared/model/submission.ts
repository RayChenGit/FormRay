import {CardType} from './card-type';

export class Submission {
  id?: number;
  fullname: string;
  email: string;
  datebirth: string;
  phonenumber: string;
  address: string;
  aptste?: string;
  zip: string;
  city: string;
  state: string;
  ssn: string;
  annualincome: number;
  incomesource: string;
  submittime?: string;
  bankeradvice?: string;
  reviewed?: boolean;
  decided?: boolean;
  finalresult?: string;
  approval?: boolean;
  cardtype: CardType;
  charged?: boolean;
}
