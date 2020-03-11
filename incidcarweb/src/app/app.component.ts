import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from './model/user';
import { CookieService } from 'ngx-cookie-service';

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
    password: '' 
  };

  constructor(private cookieService: CookieService) {}
   
  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('user'));
    console.log(this.user);
  }

  login() {
    if(this.logade){
      this.logade = false;
      this.user.email = '';
      this.user.password = ''; 
    };
    
    if(this.user.email.length>0 && this.user.password.length > 0){
      this.logade = true;
    }
    this.cookieService.set('user', JSON.stringify(this.user));
  }

}
