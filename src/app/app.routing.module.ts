import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { VisitorPageComponent } from "./components/visitor/visitor-request/visitor-request.component";
import { HomePageComponent } from "./components/visitor/home-page/home-page.component";
import { UnknownPageComponent } from "./components/unknown-page/unknown-page.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { VisitorProfileComponent } from "./components/visitor/visitor-profile/visitor-profile.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "request",
    component: VisitorPageComponent
  },
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: 'edit/:visitorId',
    component: VisitorPageComponent
  },
  {
    path: 'profile/:visitorId',
    component: VisitorProfileComponent
  },
  {
    path: "**",
    component: UnknownPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
