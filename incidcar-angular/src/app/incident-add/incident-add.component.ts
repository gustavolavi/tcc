import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../incident.service';
import { Incident } from '../model/incident';
import { User } from '../model/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-incident-add',
  templateUrl: './incident-add.component.html',
  styleUrls: ['./incident-add.component.scss']
})
export class IncidentAddComponent implements OnInit {
  user: User = { email: '', id: 0, name: '', password: '', username: '' };
  @Input() incidentData: Incident = { id: 0, title: '', description: '', status:"NEW", user: null, employee: null, comments:null };
  loading : boolean = true;

  constructor(
    public rest: IncidentService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.loading= true;
    if (this.cookieService.get('user'))
      this.user = JSON.parse(this.cookieService.get('user'));
    else
      this.router.navigate(['']);
    this.incidentData.user = this.user;
    if (this.route.snapshot.params['id']) {
      console.log('entrou');
      this.rest.getIncident(this.route.snapshot.params['id']).subscribe((data: Incident) => {
        this.incidentData = data;
      });
    }
    this.loading= false;
  }

  async add(){
    this.incidentData.user = this.user;
    this.rest.addIncident(this.incidentData).subscribe((result) => {
      this.loading= false;
      this.router.navigate(['/incidents']);     
    }, (err) => {
      this.loading= false;
      console.log(err);
    });
  }
  
  async addIncident() {
    this.loading = true;
    await this.add();
  }
}
