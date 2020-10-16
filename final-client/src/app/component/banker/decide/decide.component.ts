import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {BankerService} from '../../../shared/service/banker.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-decide',
  templateUrl: './decide.component.html',
  styleUrls: ['./decide.component.scss']
})
export class DecideComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'applycard', 'bankeradvice', 'decide'];

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
    this.bankerService.unDecidedSubmission.paginator = this.paginator;
  }

  setDeciding(submission): void {
    this.bankerService.deciding = submission;
    this.router.navigate(['/banker', 'deciding']).catch();
  }



}
