import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentComponent } from './incident/incident.component';
import { HttpClientModule } from '@angular/common/http';
import { IncidentAddComponent } from './incident-add/incident-add.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';

import { ProcessAddComponent } from './process/process-add/process-add.component';
import { ProcessListComponent } from './process/process-list/process-list.component';
import { ProcessDetailComponent } from './process/process-detail/process-detail.component';
import { HomeComponent } from './public/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent,
    IncidentAddComponent,
    IncidentDetailComponent,
    ProcessAddComponent,
    ProcessListComponent,
    ProcessDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
