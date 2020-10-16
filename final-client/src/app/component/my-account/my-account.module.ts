import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MyAccountComponent} from './my-account.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import {CustomStyleModule} from '../../shared/custom-style/custom-style.module';
import { StatementComponent } from './statement/statement.component';
import {HasCardGuard} from './has-card.guard';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaymentComponent } from './payment/payment.component';
import { ChangePasswordComponent } from './service/change-password/change-password.component';
import { ChangeInformationComponent } from './service/change-information/change-information.component';
import { AddCardComponent } from './service/add-card/add-card.component';
import { DisputeComponent } from './statement/dispute/dispute.component';
import { ManagePaymentComponent } from './service/manage-payment/manage-payment.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {path: 'statement', component: StatementComponent, canActivate: [HasCardGuard]},
      {path: 'dispute', component: DisputeComponent, canActivate: [HasCardGuard]},
      {path: 'payment', component: PaymentComponent, canActivate: [HasCardGuard]},
      {path: 'service', component: ServiceComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      {path: 'updateInformation', component: ChangeInformationComponent},
      {path: 'addCard', component: AddCardComponent},
      {path: 'managePayment', component: ManagePaymentComponent},
      {path: '**', component: HomeComponent}
    ]
  }
];


@NgModule({
  declarations: [
    MyAccountComponent,
    HomeComponent,
    ServiceComponent,
    HeaderComponent,
    StatementComponent,
    PaymentComponent,
    ChangePasswordComponent,
    ChangeInformationComponent,
    AddCardComponent,
    DisputeComponent,
    ManagePaymentComponent
  ],
  imports: [
    // for sub routing
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
export class MyAccountModule { }
