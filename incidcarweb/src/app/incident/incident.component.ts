import { Component, OnInit, Input } from '@angular/core';
import { IncidentService } from '../incident.service';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';
import { Incident } from '../model/incident';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {
  @Input() user: User;

  incidents: Incident[];

  constructor(public incident: IncidentService, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.cookieService.get('user'))
      this.user = JSON.parse(this.cookieService.get('user'));
    this.getIncidents();
  }

  getIncidents() {
    this.incidents = [];
    this.incident.getIncidents().subscribe((data: Incident[]) => {
      this.incidents = data;
    });
  }

}
