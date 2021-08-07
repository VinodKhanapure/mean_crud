import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authantication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription

  public userIsAuthenticated = false
  title1:string
  obj={}
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.obj["name"]="vinod"
    console.log("obj",this.obj)
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {

        this.userIsAuthenticated = isAuthenticated

      })

  }

  ngOnDestroy() {

    this.authListenerSubs.unsubscribe()

  }

  onLogout() {

    this.authService.logout()

  }


}
