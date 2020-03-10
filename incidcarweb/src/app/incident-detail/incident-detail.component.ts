import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../incident.service';
import { Incident } from '../model/incident';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {

  incident:Incident;

  constructor(public rest:IncidentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    /*
    this.rest.getIncident(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.incident = data;
    });
    */
  }
}
