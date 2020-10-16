import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminService} from '../../shared/service/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo = 'https://finalprojectray.s3.us-east-2.amazonaws.com/company_logo.JPG';

  constructor(
    public auth: AuthService,
    private router: Router,
    private adminService: AdminService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigate(['/login']).catch();
  }

  logout(): void {
    this.auth.logout()
      .subscribe( res => {
        this.auth.clearUser();
        this.router.navigate(['/home']).catch();
      });
  }

  consume(): void {
    this.router.navigate(['/demo']).catch();
  }

  check(): void {
    this.adminService.checkStatement().subscribe(res => {
      if (res) {
        this.snack.open('Check Statement Successfully', '', {duration: 2000, panelClass: ['pink-snackbar']});
      } else {
        this.snack.open('Check Statement failed', '', {duration: 2000, panelClass: ['red-snackbar']});
      }
    });
  }

}
