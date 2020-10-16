import {Component, Input, OnInit} from '@angular/core';
import {CardType} from '../../../shared/model/card-type';
import {Router} from '@angular/router';
import {ApplyService} from '../../../shared/service/apply.service';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.scss']
})
export class CardOverviewComponent implements OnInit {

  @Input()
  cardType: CardType;

  constructor(
    private router: Router,
    private applyService: ApplyService
  ) { }

  ngOnInit(): void {
  }

  routeToDetail(): void {
    this.router.navigate(['/card-detail', this.cardType.id]).catch();
  }

  routeToSubmit(): void {
    this.applyService.cardType = this.cardType;
    this.router.navigate(['/apply']).catch();
  }
}
