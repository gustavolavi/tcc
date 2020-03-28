import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { IncidentService } from 'src/app/incident.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @Input() user: User = { email: '', id: 0, name: '', password: '', username: '' };
  
  constructor(
    public rest: IncidentService,
    private router: Router,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void {
    if (this.cookieService.get('user'))
      this.router.navigate(['']);
  }

  create(){
      this.rest.addUser(this.user).subscribe((result) => {
        this.router.navigate(['']);
      }, (err) => {
        console.log(err);
      });
  }
}
