import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BankerService} from '../../../shared/service/banker.service';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.scss']
})
export class DisputeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'time', 'amount', 'transaction', 'reason', 'decide'];


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
    this.bankerService.unDecidedDispute.paginator = this.paginator;
  }

  setDisputing(dispute): void {
    this.bankerService.disputing = dispute;
    this.router.navigate(['/banker', 'disputing']).catch();
  }

}
