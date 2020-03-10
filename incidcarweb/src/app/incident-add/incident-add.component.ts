import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../incident.service';
import { Incident } from '../model/incident';
import { User } from '../model/user';

@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.component.html',
  styleUrls: ['./incident-add.component.scss']
})
export class IncidentAddComponent implements OnInit {

  @Input() incidentData: Incident = { id: 0, name:'', title: '', description: '' , user: null, responsavel: null };

  constructor(public rest:IncidentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addIncident() {
    this.rest.addIncident(this.incidentData).subscribe((result) => {
      console.log(result);
      this.router.navigate(['']);
    }, (err) => {
      console.log(err);
    });
  }
}
