import { Component, OnInit } from '@angular/core';
import {BankerService} from '../../../../shared/service/banker.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-deciding',
  templateUrl: './deciding.component.html',
  styleUrls: ['./deciding.component.scss']
})
export class DecidingComponent implements OnInit {

  constructor(
    public bankerService: BankerService,
    private snack: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  decide(form, result): void {
    if (!confirm('Are you sure to make this decision?')) {
      return;
    } else {
      const data =  {
        limit: form.value.limit ? form.value.limit : 0,
        submission: {
          id: this.bankerService.deciding.id,
          approval: result
        }
      };
      // console.log(data);
      this.bankerService.makeDecision(data)
        .subscribe(res => {
          if (res.success) {
            console.log(res.card);
            this.snack.open(res.message, '', {duration: 2000, panelClass: ['pink-snackbar']});
            setTimeout( () => {this.back(); this.bankerService.getNewest(); }, 2000);
          } else {
            this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
          }
        });
    }
  }

  back(): void {
    this.location.back();
  }

}
