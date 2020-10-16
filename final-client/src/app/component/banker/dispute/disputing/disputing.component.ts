import { Component, OnInit } from '@angular/core';
import {BankerService} from '../../../../shared/service/banker.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-disputing',
  templateUrl: './disputing.component.html',
  styleUrls: ['./disputing.component.scss']
})
export class DisputingComponent implements OnInit {

  constructor(
    public bankerService: BankerService,
    private snack: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

  decideDispute(result): void {
    if (!confirm('Are you sure to make this decision?')) {
      return;
    } else {
      const data = {
        decide: result,
        dispute: this.bankerService.disputing
      };
      this.bankerService.makeDisputeDecision(data)
        .subscribe(res => {
          if (res.success) {
            this.snack.open(res.message, '', {duration: 2000, panelClass: ['pink-snackbar']});
            setTimeout( () => {this.back(); this.bankerService.getNewest(); }, 2000);
          } else {
            this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
          }
        });
    }
  }
}
