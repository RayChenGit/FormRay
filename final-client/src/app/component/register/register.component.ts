import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Card} from '../../shared/model/card';
import {AuthService} from '../../shared/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserInformation} from '../../shared/model/user-information';
import {User} from '../../shared/model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cardFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  checked: boolean;
  registered: boolean;

  usernameValid: boolean;

  username: string;
  cardnumber: string;
  cardid: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  // checkCardValidator(): null | object {
  //   return this.checked ? null : {cardNotChecked : 'Card Not Checked'};
  // }

  static passwordValidator(passwordGroup): null | object {
    const {password, confirm_password} = passwordGroup.value;   // destructor here
    return password === confirm_password ?
      null : {passwordsNotMatch: 'Password and confirm_password has to be the same'};
  }

  validUsername(): void {
    if (!this.registerFormGroup.get('username').value) {
      this.usernameValid = true;
    } else {
      this.httpClient.get<boolean>(
        `${environment.Backend_URL}/users/checkname/${this.registerFormGroup.get('username').value}`
      ).subscribe( res => {
        this.usernameValid = res;
      });
    }
  }

  ngOnInit(): void{
    this.checked = false;
    this.usernameValid = true;
    this.registered = false;
    this.cardnumber = null;
    this.cardid = null;
    this.username = null;

    this.cardFormGroup = this.formBuilder.group({
      cardnumber1: ['', [Validators.required, Validators.minLength(4)]],
      cardnumber2: ['', [Validators.required, Validators.minLength(6)]],
      cardnumber3: ['', [Validators.required, Validators.minLength(5)]],
      cardid: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registerFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirm_password: ['', Validators.required]
      }, {validators: [RegisterComponent.passwordValidator]}),
      informationGroup: this.formBuilder.group({
        address1: ['', Validators.required],
        address2: '',
        city: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
        phone: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
        email: ['', [Validators.required, Validators.pattern('(.+)@(.+){2,}\\.(.+){2,}')]]
      })
    });

  }

  onlyNumber(event): void {
    event.target.value = event.target.value.replace(/[^\d]/g, '');
    this.cardFormGroup.get(event.target.name).setValue(event.target.value);
  }

  phonePattern(event): void {
    event.target.value = event.target.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3');
    this.registerFormGroup.get('informationGroup').get('phone').setValue(event.target.value);
  }

  check(): void {
    if (this.checked) {
      return;
    }
    const card = new Card();
    card.cardnumber = this.cardFormGroup.get('cardnumber1').value + '-' + this.cardFormGroup.get('cardnumber2').value + '-'
                      + this.cardFormGroup.get('cardnumber3').value;
    card.cardid = this.cardFormGroup.get('cardid').value;
    this.auth.checkCard(card)
      .subscribe(res => {
        if (res.success) {
          this.checked = true;
          this.cardnumber = card.cardnumber;
          this.cardid = card.cardid;
          this.snack.open('Check Successfully', '', {duration: 3000, panelClass: ['pink-snackbar']});
        } else if (res.code === 400){
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['blue-snackbar']});
          setTimeout(() => this.router.navigate(['/login']), 3000);
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        }
      });
  }

  register(): void {
    if (this.registered) {
      return;
    }
    const userInformation = new UserInformation();
    userInformation.address1 = this.registerFormGroup.get('informationGroup').get('address1').value;
    if (this.registerFormGroup.get('informationGroup').get('address2').value) {
      userInformation.address2 = this.registerFormGroup.get('informationGroup').get('address2').value;
    }
    userInformation.city = this.registerFormGroup.get('informationGroup').get('city').value;
    userInformation.zip = this.registerFormGroup.get('informationGroup').get('zip').value;
    userInformation.phone = this.registerFormGroup.get('informationGroup').get('phone').value;
    userInformation.email = this.registerFormGroup.get('informationGroup').get('email').value;

    const user = new User();
    user.userInformation = userInformation;
    user.username = this.registerFormGroup.get('username').value;
    user.password = this.registerFormGroup.get('passwordGroup').get('password').value;

    this.auth.register(user)
      .subscribe(res => {
        if (res.success) {
          this.registered = true;
          this.username = user.username;
          this.snack.open('Register Successfully', '', {duration: 3000, panelClass: ['pink-snackbar']});
        } else if (res.code === 400){
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['blue-snackbar']});
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        }
      });
  }

  addCheckedCard(): void {
    const data = {
      username: this.username,
      cardnumber: this.cardnumber,
      cardid : this.cardid
    };
    this.auth.addCard(data)
      .subscribe(res => {
        if (res.success) {
          this.cardid = null;
          this.snack.open('Add Card Successfully', '', {duration: 3000, panelClass: ['pink-snackbar']});
        } else {
          this.snack.open( 'Something went wrong. You can try to add this card later in your account', '', {duration: 3000, panelClass: ['red-snackbar']});
        }
        setTimeout(() => this.router.navigate(['/login']), 4500);
      });
  }


}
