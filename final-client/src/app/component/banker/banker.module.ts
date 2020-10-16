import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomStyleModule} from '../../shared/custom-style/custom-style.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {BankerComponent} from './banker.component';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { DecideComponent } from './decide/decide.component';
import { HeaderComponent } from './header/header.component';
import { DisputeComponent } from './dispute/dispute.component';
import { ReviewingComponent } from './review/reviewing/reviewing.component';
import { DecidingComponent } from './decide/deciding/deciding.component';
import { DisputingComponent } from './dispute/disputing/disputing.component';


const routes: Routes = [
  {
    path: '',
    component: BankerComponent,
    children: [
      {path: 'review', component: ReviewComponent},
      {path: 'reviewing', component: ReviewingComponent},
      {path: 'decide', component: DecideComponent},
      {path: 'deciding', component: DecidingComponent},
      {path: 'dispute', component: DisputeComponent},
      {path: 'disputing', component: DisputingComponent},
      {path: '**', component: HomeComponent}
    ]
  }
];

@NgModule({
  declarations: [
    BankerComponent,
    HomeComponent,
    ReviewComponent,
    DecideComponent,
    HeaderComponent,
    DisputeComponent,
    ReviewingComponent,
    DecidingComponent,
    DisputingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CustomStyleModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class BankerModule { }
