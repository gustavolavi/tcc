import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from './model/user';
import { CookieService } from 'ngx-cookie-service';
import { IncidentService } from './incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Incidcar';
  logade = false;
  @Input() user: User = {
    id: 0,
    name: '',
    email: '',
    username: '',
    password: ''
  };

  constructor(private cookieService: CookieService, private router: Router,  private incidentSErvice: IncidentService) { }

  ngOnInit(): void {
    if (this.cookieService.get('user')){
      this.user = JSON.parse(this.cookieService.get('user'))
      this.logade= true;
    };
  }

  login() {
    if (this.logade) {
      this.cookieService.delete('user');
      this.logade = false;
      this.user.email = '';
      this.user.username = '';
      this.user.password = '';
      this.user.employee = null;
      this.router.navigate(['']);
    };
    
    if (this.user.username.length > 0 && this.user.password.length > 0) {    
      this.incidentSErvice.getLogin(this.user).subscribe((data: User) => {
        if (data) {
          this.user = data;
          this.logade = true;
          this.cookieService.set('user', JSON.stringify(this.user));
        }
      });
    }
  }

}
