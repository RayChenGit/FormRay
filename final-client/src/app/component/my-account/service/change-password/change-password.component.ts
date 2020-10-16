import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import set = Reflect.set;
import {Location} from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changeFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private location: Location
  ) { }

  static passwordValidator(passwordGroup): null | object {
    const {newPassword, confirm_password} = passwordGroup.value;   // destructor here
    return newPassword === confirm_password ?
      null : {passwordsNotMatch: 'New Password and confirm_password has to be the same'};
  }

  ngOnInit(): void {

    this.changeFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      passwordGroup: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(3)]],
        confirm_password: ['', Validators.required]
      }, {validators: [ChangePasswordComponent.passwordValidator]})
    });

  }

  change(): void {
    const change = {
      username: this.authService.user.username,
      oldPassword: this.changeFormGroup.get('oldPassword').value,
      newPassword: this.changeFormGroup.get('passwordGroup').get('newPassword').value
    };
    this.authService.update_password(change)
      .subscribe(res => {
        if (res.success) {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['pink-snackbar']});
          this.authService.logout()
            .subscribe(r => {
              setTimeout(() => {
                this.authService.clearUser();
                this.router.navigate(['/login']).catch();
              }, 1500);
          });
        } else if (res.code === 403) {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['blue-snackbar']});
        }
      });
  }

  back(): void {
    this.location.back();
  }

}
