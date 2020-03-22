import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
