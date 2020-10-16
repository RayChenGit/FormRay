import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.scss']
})
export class ManagePaymentComponent implements OnInit {

  displayedColumns: string[] = ['bank', 'accountnumber', 'delete'];

  constructor(
    public auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  delete(payment): void {
    if (!confirm('Are you sure to delete this payment of ' + payment.bank)) {
      return;
    }
    const data = {
      userid: this.auth.user.id,
      payment
    };
    this.auth.deletePay(data)
      .subscribe(res => {
        if (res.success) {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['pink-snackbar']});
          this.auth.getNewest();
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        }
      });
  }

  add(payment): void {
    const userWithPayment = {
      userid: this.auth.user.id,
      payment
    };
    this.auth.addPayment(userWithPayment)
      .subscribe(res => {
        if (res.success) {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['pink-snackbar']});
          this.auth.getNewest();
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        }
      });
  }

  back(): void {
    this.router.navigate(['/myAccount', 'service']).catch();
  }


}
