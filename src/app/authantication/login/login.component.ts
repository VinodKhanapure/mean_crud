import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private authService: AuthService) { }

  private token: string



  onLogin(form: NgForm) {
    // console.log("value", form.value)
    if (form.invalid) {
      return
    }

    this.authService.loginUser(form.value.email, form.value.password)


    form.resetForm()
  }

}
