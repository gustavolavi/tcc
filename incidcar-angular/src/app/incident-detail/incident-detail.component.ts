import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../incident.service';
import { Incident } from '../model/incident';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {

  user: User = { email: '', id: 0, name: '', password: '', username: '' };
  incident: Incident;

  constructor(public rest: IncidentService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    if (this.cookieService.get('user'))
      this.user = JSON.parse(this.cookieService.get('user'));
    else
      this.router.navigate(['']);

    this.rest.getIncident(this.route.snapshot.params['id']).subscribe((data: Incident) => {
      this.incident = data;
    });
  }


  getIncident() {
    this.incident.employee = this.user.employee;
    console.log(this.incident);
    this.rest.updateIncident(this.incident.id, this.incident).subscribe((result) => {
      this.incident = result
    }, (err) => {
      console.log(err);
    });
  }
}
