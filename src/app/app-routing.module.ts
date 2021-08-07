import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authantication/auth-interceptor';
import { AuthGuard } from './authantication/auth.guard';
import { ErrorInterceptor } from './error-interceptor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [


  {
    path: 'auth', loadChildren: () => import(`./authantication/auth.module`).then(m => m.AuthModule)
  },

  {
    path: 'post', loadChildren: () => import(`./products/prod.module`).then(m => m.ProdModule)
  }
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],

})


export class AppRoutingModule {

}
