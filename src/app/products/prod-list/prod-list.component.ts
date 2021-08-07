import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Prod } from '../prod.model'
import { ProdService } from '../prod.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/authantication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})

export class ProdListComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription
  userIsAuthenticated;
  userId

  constructor(private prodService: ProdService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,) {

  }

  totalProds = 10
  prodPerPage = 4
  pageSizeOption = [1, 2, 5, 10]
  currentPage = 1


  prods = [];
  isLoading = true

  ngOnInit() {

    this.userIsAuthenticated = this.authService.getIsAuth();
     this.userId = this.authService.getUserId();
     console.log("before subscribe",this.userId)
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log("isAuthenticated", isAuthenticated)
        this.userIsAuthenticated = isAuthenticated
        // this.userId = this.authService.getUserId();
        console.log("after subscribe",this.userId)

      })

    this.getProds(this.prodPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }

  onChangedPage(pageData: PageEvent) {
    this.prodPerPage = pageData.pageSize
    this.currentPage = pageData.pageIndex + 1
    this.getProds(this.prodPerPage, this.currentPage)
  }

  getProds(prodPerPage, currentPage) {
    console.log(this.prodPerPage, this.currentPage)
    this.isLoading = true
    this.prodService.getProds(prodPerPage, currentPage).subscribe((prodss: any) => {
      this.isLoading = false
      console.log("prodss", prodss)
      if (prodss.prods.length > 0) {
        this.prods = prodss.prods
        console.log("prodssss1", this.prods,this.userId)
      }

      else {
        alert("No Prods")
      }

    })




  }


  prodDelete(id) {
    this.isLoading = true
    console.log("Delete")
    this.prodService.deleteProd(id).subscribe((res: any) => {
       console.log("res", res.message)
       this.snackBar.open(res.message, "Delete")
      this.getProds(this.prodPerPage, this.currentPage)

    })

    // window.location.reload()

  }

  onEdit(id) {

    this.router.navigate(['create', id])


  }


}
