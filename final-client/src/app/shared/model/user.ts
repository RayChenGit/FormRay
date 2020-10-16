import {UserInformation} from './user-information';
import {Card} from './card';
import {Role} from './role';
import {Payment} from './payment';

export class User {
  id?: number;
  username?: string;
  password?: string;
  roles?: Role[] = [{id: 1}];
  userInformation?: UserInformation;
  cards?: Card[];
  points?: number;
  payments?: Payment[];
}
