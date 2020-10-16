import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardService} from '../../../shared/service/card.service';
import {AuthService} from '../../../shared/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @ViewChild('input')
  inputPayment: ElementRef;

  constructor(
    public authService: AuthService,
    public cardService: CardService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  pay(data): void {
    let pay = +data.payment;
    switch (pay) {
      case 1:
        pay = this.cardService.activedCard.totalbalance;
        break;
      case 2:
        pay = this.cardService.activedCard.totalbalance + this.cardService.activedCard.postedcharge;
        break;
      case 3 :
        pay = +(this.cardService.activedCard.totalbalance * 0.3).toFixed(2);
        break;
      default:
        pay = +(this.inputPayment.nativeElement.value ? this.inputPayment.nativeElement.value : 0);
    }
    if (!confirm('Are you sure to pay $ ' + pay + ' on the card ending with ' + this.cardService.activedCard.cardnumber.slice(-5))) {
      return;
    }
    const payment = {
      card: this.cardService.activedCard,
      payment: +pay
    };
    this.cardService.pay(payment)
      .subscribe(res => {
          if (res.success) {
            this.snack.open(res.message, '', {duration: 3000, panelClass: ['pink-snackbar']});
            this.authService.getNewest();
          } else {
            this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
          }
        });
  }

  goToManage(): void {
    this.router.navigate(['/myAccount', 'managePayment']).catch();
  }

}
