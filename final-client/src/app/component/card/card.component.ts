import { Component, OnInit } from '@angular/core';
import {CardService} from '../../shared/service/card.service';
import {CardType} from '../../shared/model/card-type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  constructor(public cardService: CardService) { }

  ngOnInit(): void { }

}
