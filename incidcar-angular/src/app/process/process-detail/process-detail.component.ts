import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/model/process';
import { User } from 'src/app/model/user';
import { IncidentService } from 'src/app/incident.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit {

  user: User = { email: '', id: 0, name: '', password: '', username: '' };
  process: Process = { id: 0, title: '', description: '',tasks:[] };

  constructor(
    public rest: IncidentService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    if (this.cookieService.get('user'))
      this.user = JSON.parse(this.cookieService.get('user'));
    else
      this.router.navigate(['']);
      
    if (this.route.snapshot.params['id']) {
      this.rest.getProcess(this.route.snapshot.params['id']).subscribe((data: Process) => {
        this.process = data;
      });
    }
  }

}
