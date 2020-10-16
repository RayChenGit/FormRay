import { Component, OnInit } from '@angular/core';
import {BankerService} from '../../../../shared/service/banker.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviewing',
  templateUrl: './reviewing.component.html',
  styleUrls: ['./reviewing.component.scss']
})
export class ReviewingComponent implements OnInit {

  reviewForm: FormGroup;

  constructor(
    public bankerService: BankerService,
    private location: Location,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      bankeradvice: ''
    });
  }

  review(): void {
    const data =  {
      id: this.bankerService.reviewing.id,
      bankeradvice: this.reviewForm.get('bankeradvice').value
    };
    this.bankerService.makeReview(data)
      .subscribe(res => {
        if (res.success) {
          this.snack.open('Review Successfully', '', {duration: 2000, panelClass: ['pink-snackbar']});
          setTimeout( () => {this.back(); this.bankerService.getNewest(); }, 2000);
        } else {
          this.snack.open('Review Failed', '', {duration: 2000, panelClass: ['red-snackbar']});
        }
      });
  }

  back(): void {
    this.location.back();
  }

}
