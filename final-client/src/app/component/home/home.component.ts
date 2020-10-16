import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import {Router} from '@angular/router';
import {CardService} from '../../shared/service/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageObject: Array<object> = [
    {thumbImage: 'https://finalprojectray.s3.us-east-2.amazonaws.com/home_11.JPG', alt: 'Home_Page_1'},
    {thumbImage: 'https://finalprojectray.s3.us-east-2.amazonaws.com/home_22.JPG', alt: 'Home_Page_2'},
    {thumbImage: 'https://finalprojectray.s3.us-east-2.amazonaws.com/home_33.JPG', alt: 'Home_Page_3'},
    {thumbImage: 'https://finalprojectray.s3.us-east-2.amazonaws.com/home_44.JPG', alt: 'Home_Page_4'},
    {thumbImage: 'https://finalprojectray.s3.us-east-2.amazonaws.com/home_55.JPG', alt: 'Home_Page_5'},
    {thumbImage: 'https://finalprojectray.s3.us-east-2.amazonaws.com/home_66.JPG', alt: 'Home_Page_6'},
  ];

    constructor(
    private cardService: CardService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  route(event): void {
    this.router.navigate(['/card-detail', event + 1]).catch();
  }

}
