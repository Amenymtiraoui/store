import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from  './home/dashboard/dashboard.component';
import { AchatsPieChartComponent } from './achats-pie-charts/achats-pie-charts.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AchatsPieChartComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
