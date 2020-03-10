import { Component, OnInit, Input } from '@angular/core';
import { IncidentService } from '../incident.service';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {
  @Input() user:User;

  incidents:any = [];
  constructor(public incident:IncidentService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('user'));
  }
  
  getIncidents() {
    this.incidents = [];
    this.incident.getIncidents().subscribe((data: {}) => {
      console.log(data);
      this.incidents = data;
    });
  }

}
