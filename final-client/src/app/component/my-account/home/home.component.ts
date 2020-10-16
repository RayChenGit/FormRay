import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user';
import {AuthService} from '../../../shared/service/auth.service';
import {CardService} from '../../../shared/service/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public cardService: CardService) { }

  ngOnInit(): void { }

}
