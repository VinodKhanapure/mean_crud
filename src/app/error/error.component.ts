import { Component, Inject, Optional } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: "../error/error.component.html"
})

export class ErrorComponent {

  constructor(@Optional()@Inject(MAT_DIALOG_DATA) public data:any) {
    console.log("data",data)
   }



}
