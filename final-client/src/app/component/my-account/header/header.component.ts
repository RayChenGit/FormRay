import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user';
import {CardService} from '../../../shared/service/card.service';
import {AuthService} from '../../../shared/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              public cardService: CardService
) { }

  ngOnInit(): void {
  }

}
