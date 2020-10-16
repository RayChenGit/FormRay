import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {AdminService} from '../../shared/service/admin.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  demoFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.demoFormGroup = this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      cardnumber: ['', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{6}-[0-9]{5}')]],
      cardid: ['', [Validators.required, Validators.pattern('[0-9]{4}')]]
    });
  }

  onlyNumber(event): void {
    event.target.value = event.target.value.replace(/[^\d]/g, '');
    this.demoFormGroup.get(event.target.name).setValue(event.target.value);
  }

  cardPattern(event): void {
    event.target.value = event.target.value.replace(/(\d{4})\-?(\d{6})\-?(\d{5})/, '$1-$2-$3');
    this.demoFormGroup.get('cardnumber').setValue(event.target.value);
  }

  post(): void {
    const post = {
      amount: +this.demoFormGroup.get('amount').value,
      description: this.demoFormGroup.get('description').value,
      card : {
        cardnumber: this.demoFormGroup.get('cardnumber').value,
        cardid: this.demoFormGroup.get('cardid').value
      }
    };
    this.adminService.postTransaction(post)
      .subscribe(res => {
        if (res.success) {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['pink-snackbar']});
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        }
      });
  }

}
