import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../incident.service';
import { Incident } from '../model/incident';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';
import { Comments } from '../model/comments';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent implements OnInit {

  user: User = { email: '', id: 0, name: '', password: '', username: '' };
  incident: Incident;
  comment: Comments = { id: 0, description: '' };
  hasClose: boolean = false;
  hasEdit: boolean = false;
  hasComment: boolean = false;

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
      this.buttonValidate();
    });
  }

  buttonValidate() {
    if (this.incident.status !== "CLOSED") {
      console.log("entrou");
      if (this.user.id == this.incident.user.id) {
        this.hasComment = true;
      }

      if (this.user.employee != null) {
        this.hasComment = true;

        if (this.incident.employee != null) {
          this.hasClose = this.user.employee.id == this.incident.employee.id && this.incident.status != "CLOSED";
          this.hasEdit = this.user.employee != null && this.user.employee.id != this.incident.employee.id;
        } else if (this.incident.employee == null) {
          this.hasEdit = true;
        }
      }
    }
  }
  updateIncident() {
    this.incident.employee = this.user.employee;
    this.incident.status = "DOING";
    this.rest.updateIncident(this.incident.id, this.incident).subscribe((result) => {
      this.incident = result
      this.buttonValidate();
    }, (err) => {
      console.log(err);
    });
  }

  closeIncident() {
    this.incident.employee = this.user.employee;
    this.incident.status = "CLOSED";
    this.rest.updateIncident(this.incident.id, this.incident).subscribe((result) => {
      this.incident = result
      this.buttonValidate();
    }, (err) => {
      console.log(err);
    });
  }

  addComment() {
    this.comment.user = this.user;
    this.comment.incident = { id: this.incident.id };
    this.incident.comments = this.incident.comments ? this.incident.comments : [];
    this.incident.comments.push(this.comment);

    this.rest.updateIncident(this.incident.id, this.incident).subscribe((result) => {
      this.incident = result
      this.buttonValidate();
      this.comment = { id: 0, description: '' };
    }, (err) => {
      console.log(err);
    });
  }
}
