import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/service/auth.service';
import {UserInformation} from '../../../../shared/model/user-information';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-information',
  templateUrl: './change-information.component.html',
  styleUrls: ['./change-information.component.scss']
})
export class ChangeInformationComponent implements OnInit {

  informationGroup: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.informationGroup =  this.formBuilder.group({
        address1: [this.auth.user.userInformation.address1, Validators.required],
        address2: this.auth.user.userInformation.address2,
        city: [this.auth.user.userInformation.city, Validators.required],
        zip: [this.auth.user.userInformation.zip, [Validators.required, Validators.pattern('[0-9]{5}')]],
        phone: [this.auth.user.userInformation.phone, [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
        email: [this.auth.user.userInformation.email, [Validators.required, Validators.pattern('(.+)@(.+){2,}\\.(.+){2,}')]]
      });
  }

  back(): void {
    this.location.back();
  }

  phonePattern(event): void {
    event.target.value = event.target.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3');
    this.informationGroup.get('phone').setValue(event.target.value);
  }

  update(): void {
    const user = this.auth.user;
    const userInformation = new UserInformation();
    userInformation.address1 = this.informationGroup.get('address1').value;
    if (this.informationGroup.get('address2').value) {
      userInformation.address2 = this.informationGroup.get('address2').value;
    }
    userInformation.city = this.informationGroup.get('city').value;
    userInformation.zip = this.informationGroup.get('zip').value;
    userInformation.phone = this.informationGroup.get('phone').value;
    userInformation.email = this.informationGroup.get('email').value;
    userInformation.id = user.userInformation.id;
    user.userInformation = userInformation;

    this.auth.updateInformation(user)
      .subscribe(res => {
          if (res.success) {
            this.snack.open(res.message, '', {duration: 3000, panelClass: ['pink-snackbar']});
            this.auth.getNewest();
          } else {
            this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
          }
        });
  }

}
