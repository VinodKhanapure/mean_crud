import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
@NgModule({

  declarations: [LoginComponent, SignUpComponent],
  imports: [AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,CommonModule,RouterModule,AuthRoutingModule]

})

export class AuthModule {

}
