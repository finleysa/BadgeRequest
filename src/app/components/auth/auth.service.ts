import { Subject } from "rxjs";
import { User } from "../../classes/user";
import { AuthData } from "../../classes/auth-data";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private _token: string;

  getToken() {
    return this._token;
  }


  constructor(private http: HttpClient, private router: Router) {}

  login(authData: AuthData) {

    this.http
      .post<{message: string, token: string}>("http://localhost:3000/users/api/login", authData)
      .subscribe(
        responseData => {
            console.log(responseData);
            this._token = responseData.token;
        },
        err => {
          if (!err) {
            this.authChange.next(true);
          } else {
            this.logout();
          }
        },
        () => {
          if (this._token) {
            this.router.navigate(["/home"]);
          }
        }
      );
  }

  logout() {
    this._token = null;
    this.authChange.next(false);
  }

  isAuth() {
    return this._token != null;
  }
}
