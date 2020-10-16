import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from '../../../../shared/service/transaction.service';
import {Location} from '@angular/common';
import {AuthService} from '../../../../shared/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.scss']
})
export class DisputeComponent implements OnInit {

  @ViewChild('input')
  inputReason: ElementRef;

  constructor(
    public transactionService: TransactionService,
    private location: Location,
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

  dispute(data): void {
    let rea = data.reason;
    if (rea === 'other') {
      rea = this.inputReason.nativeElement.value;
    }
    const dispute = {
      reason: rea,
      transaction: this.transactionService.disputeOne
    };
    this.transactionService.postDispute(dispute)
      .subscribe(res => {
        if (res.success) {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['pink-snackbar']});
          this.auth.getNewest();
          setTimeout(() => this.location.back(), 2000);
        } else {
          this.snack.open(res.message, '', {duration: 3000, panelClass: ['red-snackbar']});
        }
      });
  }

}
