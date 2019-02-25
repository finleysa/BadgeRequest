import { AppComponent } from "./app.component";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";

import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app.routing.module";
import { UnknownPageComponent } from "./components/unknown-page/unknown-page.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { AuthService } from "./components/auth/auth.service";
import { HomePageComponent } from "./components/visitor/home-page/home-page.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { VistorListComponent } from "./components/visitor/vistor-list/vistor-list.component";
import { VisitorPageComponent } from "./components/visitor/visitor-request/visitor-request.component";
import { VisitorProfileComponent } from "./components/visitor/visitor-profile/visitor-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    UnknownPageComponent,
    LoginComponent,
    HomePageComponent,
    ToolbarComponent,
    VisitorPageComponent,
    VistorListComponent,
    VisitorProfileComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
