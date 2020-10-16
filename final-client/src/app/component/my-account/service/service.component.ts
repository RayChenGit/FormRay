import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/service/auth.service';
import {CardService} from '../../../shared/service/card.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
  }

}
