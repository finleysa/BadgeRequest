import { Subject } from "rxjs";
import { User } from "../../classes/user";
import { AuthData } from "../../classes/auth-data";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  user: User;

  constructor(private http: HttpClient, private router: Router) {}

  login(authData: AuthData) {
    this.user = {
      username: null,
      _id: null,
      hash: null
    };
    this.http
      .post<User>("http://localhost:3000/users/api/login", authData)
      .subscribe(
        responseData => {
          localStorage.setItem("user", responseData.toString());
        },
        err => {
          if (!err) {
            this.authChange.next(true);
          } else {
            this.logout();
          }
        },
        () => {
          if (this.user._id) {
            this.router.navigate(["/home"]);
          }
        }
      );
  }

  logout() {
    this.user = null;
    localStorage.clear();

    this.authChange.next(false);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
