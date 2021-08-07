import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiurl

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false

  private authStatusListener = new Subject<boolean>()

  constructor(private http: HttpClient, private router: Router) {

  }

  private token: string;
  private tokenTimer: any;
  private userId: string


  getToken() {
    console.log("methodToken", this.token)
    return this.token
  }

  getUserId() {
    return this.userId
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  createUser(email: string, password: string): Observable<any> {

    const authData: AuthData = { email: email, password: password }

    return this.http.post(BACKEND_URL + '/user/signup', authData)

  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + '/user/login', authData).subscribe(res => {
      // this.saveUserId(res.userId)
      const token = res.token
      this.token = token;
      if (token) {
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration)
        console.log("expiresInDuration", expiresInDuration)
        setTimeout(() => {
          this.logout()
        }, expiresInDuration * 1000);
        this.userId = res.userId
        this.isAuthenticated = true;
        this.authStatusListener.next(true)
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
        this.saveAuthData(token, expirationDate, this.userId)
        this.router.navigate(['/'])

      }


    })

  }



  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    console.log("saveAuthData called", expirationDate)
    localStorage.setItem("token", token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem("userId", userId)
    console.log("expirationDate.toISOString()", expirationDate.toISOString())
  }

  private getAuthData() {
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    const userId = localStorage.getItem("userId")
    console.log("getAuthData", this.userId)
    if (!token || !expirationDate) {
      return
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log("authInformation", authInformation)
    const now = new Date()
    const expiresInDuration = authInformation?.expirationDate.getTime() - now.getTime()
    if (expiresInDuration > 0) {
      this.token = authInformation.token
      this.isAuthenticated = true
      this.userId = authInformation.userId
      this.setAuthTimer(expiresInDuration / 1000)
      this.authStatusListener.next(true)
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => { this.logout() }, duration * 1000)
  }

  private clearAuthData() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("userId")


  }

  logout() {
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.router.navigate(['/'])
    clearTimeout(this.tokenTimer)
    this.clearAuthData();
    this.userId = null
  }



}
