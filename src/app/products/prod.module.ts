import { NgModule } from '@angular/core';
import { ProdListComponent } from './prod-list/prod-list.component';
import { ProdCreateComponent } from './prod-create/prod-create.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdRoutingModule } from './prod-routing.module';
@NgModule({
  declarations: [ProdListComponent, ProdCreateComponent],

  imports: [AngularMaterialModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,RouterModule,ProdRoutingModule ]
})

export class ProdModule {

}
