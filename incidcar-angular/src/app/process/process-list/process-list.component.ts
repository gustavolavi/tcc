import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/model/process';
import { IncidentService } from 'src/app/incident.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {

  user: User;
  processes: Process[];

  constructor(
    public rest: IncidentService,
    private router: Router,
    private cookieService: CookieService
  ) { }
  
  ngOnInit(): void {
    if (this.cookieService.get('user'))
      this.user = JSON.parse(this.cookieService.get('user'));
    else
      this.router.navigate(['']);

    this.getProcesses();
  }

  getProcesses() {
    this.processes = [];
    this.rest.getProcesses().subscribe((data: Process[]) => {
      this.processes = data;
    });
  }

}
