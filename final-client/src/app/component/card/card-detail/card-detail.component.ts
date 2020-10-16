import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CardService} from '../../../shared/service/card.service';
import {CardType} from '../../../shared/model/card-type';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ApplyService} from '../../../shared/service/apply.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  id: number;
  cardType: CardType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    private router: Router,
    private applyService: ApplyService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.cardService.getById(this.id);
      })).subscribe( res => {
        if (res.success) {
          this.cardType = res.cardType;
          console.log(this.cardType);
        } else {
          this.router.navigate(['/card']).catch();
        }
      });
  }

  routeToSubmit(): void {
    this.applyService.cardType = this.cardType;
    this.router.navigate(['/apply']).catch();
  }

}
