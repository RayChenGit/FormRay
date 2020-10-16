import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomStyleModule} from './shared/custom-style/custom-style.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { CardComponent } from './component/card/card.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminComponent } from './component/admin/admin.component';
import { CardOverviewComponent } from './component/card/card-overview/card-overview.component';
import { CardDetailComponent } from './component/card/card-detail/card-detail.component';
import { ApplyComponent } from './component/apply/apply.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgImageSliderModule} from 'ng-image-slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ChartsModule} from 'ng2-charts';
import { DemoComponent } from './component/demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    FooterComponent,
    RegisterComponent,
    AdminComponent,
    CardOverviewComponent,
    CardDetailComponent,
    ApplyComponent,
    DemoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomStyleModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        OverlayModule,
        NgImageSliderModule,
        MatPaginatorModule,

      ChartsModule
    ],
  providers: [],
  exports: [
    CardOverviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
