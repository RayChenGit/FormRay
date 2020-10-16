import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  addFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.addFormGroup = this.formBuilder.group({
      cardnumber: ['', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{6}-[0-9]{5}')]],
      cardid: ['', [Validators.required, Validators.pattern('[0-9]{4}')]]
    });
  }

  onlyNumber(event): void {
    event.target.value = event.target.value.replace(/[^\d]/g, '');
    this.addFormGroup.get(event.target.name).setValue(event.target.value);
  }

  cardPattern(event): void {
    event.target.value = event.target.value.replace(/(\d{4})\-?(\d{6})\-?(\d{5})/, '$1-$2-$3');
    this.addFormGroup.get('cardnumber').setValue(event.target.value);
  }

  addCard(): void {
    const add = {
      username: this.auth.user.username,
      cardnumber: this.addFormGroup.get('cardnumber').value,
      cardid: this.addFormGroup.get('cardid').value
    };
    this.auth.addCard(add)
      .subscribe(res => {
        if (res.success) {
          this.snack.open('Add Card Successfully', '', {duration: 3000, panelClass: ['pink-snackbar']});
          this.auth.getNewest();
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        }
      });
  }

  back(): void {
    this.location.back();
  }

}
