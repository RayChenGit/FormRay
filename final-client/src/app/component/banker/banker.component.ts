import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {BankerService} from '../../shared/service/banker.service';
import {CardType} from '../../shared/model/card-type';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.component.html',
  styleUrls: ['./banker.component.scss']
})
export class BankerComponent implements OnInit {

  constructor(public bankerService: BankerService) { }

  ngOnInit(): void {
    this.bankerService.getNewest();
  }


}
