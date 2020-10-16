import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApplyService} from '../../shared/service/apply.service';
import {CardType} from '../../shared/model/card-type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Submission} from '../../shared/model/submission';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  cardType: CardType;
  applyFormGroup: FormGroup;

  states: string[];
  sources: string[];

  checked: boolean;

  constructor(
    public applyService: ApplyService,
    private router: Router,
    private snack: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!this.applyService.cardType) {
      this.snack.open('Please Review the card information and then apply', '', {duration: 3000, panelClass: ['red-snackbar']});
      setTimeout(() => this.router.navigate(['card']).catch(), 1200);
      return;
    }

    this.cardType = this.applyService.cardType;
    this.states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    this.sources = ['Employed', 'Retired', 'Self-Employed', 'Unemployed', 'Military', 'Business Owner', 'Other'];

    this.applyFormGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('(.+)@(.+){2,}\\.(.+){2,}')]],
      datebirth: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
      address: ['', Validators.required],
      aptste: '',
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      state: ['', Validators.required],
      ssn: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{4}')]],
      annualincome: ['', [Validators.required, Validators.minLength(4)]],
      incomesource: ['', Validators.required]
    });

    this.checked = false;
  }

  phonePattern(event): void {
    event.target.value = event.target.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3');
    this.applyFormGroup.get(event.target.name).setValue(event.target.value);
  }

  ssnPattern(event): void {
    event.target.value = event.target.value.replace(/(\d{3})\-?(\d{2})\-?(\d{4})/, '$1-$2-$3');
    this.applyFormGroup.get(event.target.name).setValue(event.target.value);
  }

  onlyNumber(event): void {
    event.target.value = event.target.value.replace(/[^\d]/g, '');
    this.applyFormGroup.get(event.target.name).setValue(event.target.value);
  }


  apply(): void {
    const submission: Submission = new Submission();
    submission.cardtype = this.cardType;
    submission.fullname = this.applyFormGroup.get('firstname').value + ' ' + this.applyFormGroup.get('lastname').value;
    submission.email = this.applyFormGroup.get('email').value;
    submission.datebirth = this.applyFormGroup.get('datebirth').value;
    submission.phonenumber = this.applyFormGroup.get('phonenumber').value;
    submission.address = this.applyFormGroup.get('address').value;
    if (this.applyFormGroup.get('aptste').value) {
      submission.aptste = this.applyFormGroup.get('aptste').value;
    }
    submission.zip = this.applyFormGroup.get('zip').value;
    submission.city = this.applyFormGroup.get('city').value;
    submission.state = this.applyFormGroup.get('state').value;
    submission.ssn = this.applyFormGroup.get('ssn').value;
    submission.annualincome = +this.applyFormGroup.get('annualincome').value;
    submission.incomesource = this.applyFormGroup.get('incomesource').value;

    this.applyService.apply(submission)
      .subscribe(res => {
        if (res.success) {
          this.applyService.cardType = null;
          this.snack.open('Apply Successfully. Result will be sent to you through Email',
            '', {duration: 4000, panelClass: ['pink-snackbar']});
          setTimeout(() => this.router.navigate(['home']).catch(), 4000);
        } else {
          this.snack.open('Something went wrong. Try again',
            '', {duration: 4000, panelClass: ['red-snackbar']});
        }
      });
  }


}
