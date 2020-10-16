import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, MultiDataSet, SingleDataSet} from 'ng2-charts';
import {AdminService} from '../../shared/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  donutColors = [
    { backgroundColor: [
        'rgba(255, 223, 0, 1)',
        'rgba(229, 228, 226, 1)',
        'rgba(30, 144, 255, 1)',
        'rgba(192, 192, 192, 1)',
        'rgba(65, 105, 225, 1)',
        'rgba(50, 205, 50, 1)'
      ]}
  ];
  barChartLabels: Label[] = ['Gold Card', 'Platinum Card', 'Cash Magnet Card', 'EveryDay Preferred Card', 'Hilton Honors Card', 'Green Card'];

  // barChartData: ChartDataSets[] = [
  //   { data: [1, 1, 1, 1, 1, 1], label: 'Card Application' }
  // ];
  barChartData: ChartDataSets[] = null;


  barChartOptions1: ChartOptions = {
    responsive: true,
  };
  barChartType1: ChartType = 'bar';
  barChartLegend1 = true;
  barChartPlugins1 = [];
  donutColors1 = [
    { backgroundColor: [
        'rgba(255, 223, 0, 1)',
        'rgba(229, 228, 226, 1)',
        'rgba(30, 144, 255, 1)',
        'rgba(192, 192, 192, 1)',
        'rgba(65, 105, 225, 1)',
        'rgba(50, 205, 50, 1)'
      ]}
  ];
  barChartLabels1: Label[] = ['Gold Card', 'Platinum Card', 'Cash Magnet Card', 'EveryDay Preferred Card', 'Hilton Honors Card', 'Green Card'];

  barChartData1: ChartDataSets[] = null;


  doughnutChartLabels: Label[] = ['Undecided', 'Approval', 'Rejection'];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: MultiDataSet = null;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['UnDecided'], ['Approval'], 'Deny'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartData: SingleDataSet = null;


  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllApplications()
      .subscribe(res => {
        const firstR = res.filter(s => s.cardtype.id === 1);
        const first = firstR.length;
        const secondR = res.filter(s => s.cardtype.id === 2);
        const second = secondR.length;
        const thirdR = res.filter(s => s.cardtype.id === 3);
        const third = thirdR.length;
        const fourthR = res.filter(s => s.cardtype.id === 4);
        const fourth = fourthR.length;
        const fifthR = res.filter(s => s.cardtype.id === 5);
        const fifth = fifthR.length;
        const sixthR = res.filter(s => s.cardtype.id === 6);
        const sixth = sixthR.length;

        // const clone = JSON.parse(JSON.stringify(this.barChartData));
        // clone[0].data = [first, second, third, fourth, fifth, sixth];
        // this.barChartData = clone;
        this.barChartData = [
          { data: [first, second, third, fourth, fifth, sixth], label: 'Card Application' }
        ];

        const firstA = firstR.reduce((s1, s2) => s1 + s2.annualincome, 0) / first;
        const secondA = secondR.reduce((s1, s2) => s1 + s2.annualincome, 0) / second;
        const thirdA = thirdR.reduce((s1, s2) => s1 + s2.annualincome, 0) / third;
        const fourthA = fourthR.reduce((s1, s2) => s1 + s2.annualincome, 0) / fourth;
        const fifthA = fifthR.reduce((s1, s2) => s1 + s2.annualincome, 0) / fifth;
        const sixthA = sixthR.reduce((s1, s2) => s1 + s2.annualincome, 0) / sixth;

        this.barChartData1 = [
          { data: [firstA, secondA, thirdA, fourthA, fifthA, sixthA], label: 'Applicant income average' }
        ];

        const undecided = res.filter(s => !s.decided).length;
        const approval = res.filter(s => s.decided && s.approval).length;
        const rejection = res.filter(s => s.decided && !s.approval).length;
        this.doughnutChartData = [[undecided, approval, rejection]];
      });

    this.adminService.getAllDisputes()
        .subscribe(res => {
          const undecidedP = res.filter(d => !d.decided).length;
          const approvalP = res.filter(d => d.decided && d.result).length;
          const denyP = res.filter(d => d.decided && !d.result).length;
          this.pieChartData = [undecidedP, approvalP, denyP];
        });
  }



}
