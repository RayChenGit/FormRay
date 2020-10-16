import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CardService} from '../../../shared/service/card.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {TransactionService} from '../../../shared/service/transaction.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../shared/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'time', 'description', 'amount', 'dispute', 'reward'];

  math = Math;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  constructor(
    public cardService: CardService,
    private transactionService: TransactionService,
    private snack: MatSnackBar,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cardService.transactions.paginator = this.paginator;
  }

  dispute(e): void {
    this.transactionService.disputeOne = e;
    this.router.navigate(['/myAccount', 'dispute']).catch();
  }

  reward(e): void {
    if (!confirm('Are you sure you want to use ' + e.amount * 100 + ' reward points to redeem this transaction?')) {
      return;
    }
    this.transactionService.reward(e)
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
