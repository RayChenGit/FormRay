import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {BankerService} from '../../../shared/service/banker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'fullname', 'datebirth', 'address', 'annualincome', 'incomesource', 'applycard', 'ssn'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    public bankerService: BankerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bankerService.getNewest();
  }

  ngAfterViewInit(): void {
    this.bankerService.unReviewedSubmission.paginator = this.paginator;
  }

  setReviewing(submission): void {
    this.bankerService.reviewing = submission;
    this.router.navigate(['/banker', 'reviewing']).catch();
  }

}
