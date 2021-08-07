import { NgModule } from '@angular/core';
import { ProdListComponent } from './prod-list/prod-list.component';
import { ProdCreateComponent } from './prod-create/prod-create.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authantication/auth.guard';

const routes: Routes = [{

  path: 'create', component: ProdCreateComponent, canActivate: [AuthGuard]

},

{
  path: 'edit/:prodId', component: ProdCreateComponent
},


{
  path: '', component: ProdListComponent
},]


@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class ProdRoutingModule { }
