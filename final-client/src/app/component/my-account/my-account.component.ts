import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import {Router} from '@angular/router';
import {CardService} from '../../shared/service/card.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {Transaction} from '../../shared/model/transaction';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public cardService: CardService,
    private router: Router,
    private snack: MatSnackBar
  ) { }


  ngOnInit(): void {
    if (this.authService.user.cards.length > 0) {
      this.cardService.activedCard = this.authService.user.cards[0];
      this.cardService.transactions =
        new MatTableDataSource<Transaction>(this.cardService.activedCard.transactions.
        sort((t1, t2) => t2.time.localeCompare(t1.time)));
    } else {
      this.snack.open('It seems you don\'t have a card in your account, try add one!', '', {duration: 5000, panelClass: ['red-snackbar']});
      this.router.navigate(['/myAccount/addCard']).catch();
    }
  }

  active(cardnumber): void {
    this.cardService.activedCard = this.authService.user.cards.find(c => c.cardnumber === cardnumber);
    this.cardService.transactions.data = this.cardService.activedCard.transactions.sort((t1, t2) => t2.time.localeCompare(t1.time));
  }

}
