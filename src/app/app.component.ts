import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { AuthService } from './authantication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meancourse';

  constructor(private authService:AuthService){

  }

  ngOnInit(){
    console.log("app ngOnit called")
   this.authService.autoAuthUser()
  }

}
