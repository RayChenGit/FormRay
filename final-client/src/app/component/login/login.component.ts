import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  checked = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  submit(form): void {
    this.auth.login(form.value, this.checked)
      .subscribe( res => {
        if (res.success) {
          this.auth.updateUser(res.user);
          let route = '/home';
          if (this.auth.banker && !this.auth.admin) {
            route = '/banker';
          } else if ( this.auth.admin) {
            route = '/admin';
          } else if (this.auth.normal) {
            route = '/myAccount';
          }
          this.snack.open('Login Successfully', '', {duration: 2000, panelClass: ['pink-snackbar']});
          setTimeout( () => this.router.navigate([route]).catch(), 800);
        }
      }, err => {
          this.snack.open('Login Failed, try again', '', {duration: 3000, panelClass: ['red-snackbar']});
        });
  }

  change(): void {
    this.checked = !this.checked;
  }

}
