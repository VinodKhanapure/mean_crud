import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent {

  constructor(private authService: AuthService) {

  }

  onSignup(form: NgForm) {

    console.log(form.value)

    if (form.invalid) {
      return
    }

    this.authService.createUser(form.value.email, form.value.password).subscribe(res => {

      console.log("res",res)
      alert(res.message)

    })



  }

}
