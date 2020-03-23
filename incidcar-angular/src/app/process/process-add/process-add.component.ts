import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { Process } from 'src/app/model/process';
import { IncidentService } from 'src/app/incident.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-process-add',
  templateUrl: './process-add.component.html',
  styleUrls: ['./process-add.component.scss']
})
export class ProcessAddComponent implements OnInit {
  emplyees: Employee[] = [];
  user: User = { email: '', id: 0, name: '', password: '', username: '' };
  @Input() process: Process = {
    id: 0, title: '', description: '', manager: { id: 0 },
    tasks: [{ id: 0, name: '', description: '', ativo: false, state: '' }]
  };

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

    this.rest.getEmployees().subscribe((result) => {
      this.emplyees = result;
    });

    if (this.route.snapshot.params['id']) {
      this.rest.getProcess(this.route.snapshot.params['id']).subscribe((data: Process) => {
        this.process = data;
      });
    }
  }

  addTask() {
    this.process.tasks.push({ id: 0, name: '', description: '', ativo: false, state: '' });
  }

  addProcess() {
    console.log(this.process);
    if (this.route.snapshot.params['id']) {
      this.rest.updateProcess(this.process.id, this.process).subscribe((result) => {
        this.router.navigate(['processes']);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.rest.addProcess(this.process).subscribe((result) => {
        this.router.navigate(['processes']);
      }, (err) => {
        console.log(err);
      });
    }
  }
}
