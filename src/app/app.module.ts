import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ErrorComponent } from './error/error.component'
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdModule } from './products/prod.module';

import { CommonModule } from '@angular/common';
import { AuthModule } from './authantication/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    ProdModule,
    AuthModule,

    CommonModule


  ],

  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent,],
  entryComponents: [ErrorComponent]

})
export class AppModule { }
