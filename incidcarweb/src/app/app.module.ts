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

@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent,
    IncidentAddComponent,
    IncidentDetailComponent
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
