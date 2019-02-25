import { Visitor } from "../../classes/visitor";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject, Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class VisitorService {
  private url = "http://localhost:3000/visitors/api/";
  public visitors: Visitor[] = [];
  visitorsUpdated = new Subject<Visitor[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addVisitorRequest(
    form: FormGroup,
    citizenshipImage: File,
    driversLicenseImage: File
  ) {
    const fd = new FormData();

    fd.append("lastName", form.value.lastName);
    fd.append("firstName", form.value.firstName);
    fd.append("middleName", form.value.middleName);
    fd.append("suffix", form.value.suffix);
    fd.append("ssn", form.value.ssn);
    fd.append("dob", form.value.dob);
    fd.append("organization", form.value.organization);
    fd.append("image", citizenshipImage, citizenshipImage.name);
    fd.append(
      "image",
      driversLicenseImage,
      driversLicenseImage.name
    );

    this.http
      .post<Visitor>(this.url + "add", fd)
      .subscribe(visitor => {
        this.visitors.push(visitor);
        this.visitorsUpdatedEvent();
        this.router.navigate(["/profile/" + visitor._id]);
      });
  }

  getVisitor(visitorId: string) {
    return this.http.get<Visitor>(this.url + visitorId);
  }

  getAllVisitors() {
    this.http
      .get<{ message: string; success: boolean; data: any }>(this.url + "all")
      .pipe(
        map(visitors => {
          return visitors.data.map(visitor => {
            return {
              firstName: visitor.firstName,
              middleName: visitor.middleName,
              lastName: visitor.lastName,
              pob: visitor.pob,
              dob: new Date(visitor.dob).toDateString(),
              ssn: visitor.ssn,
              organization: visitor.organization,
              driversLicenseImage: visitor.driversLicenseImage,
              citizenshipImage: visitor.citizenshipImage,
              _id: visitor._id
            };
          });
        })
      )
      .subscribe(visitors => {
        this.visitors = <Visitor[]>visitors;
        this.visitorsUpdatedEvent();
      });
  }

  updateVisitorRequest(form: FormGroup,
    citizenshipImage: File | string,
    driversLicenseImage: File | string,
    visitorId: string) {
    let visitorData: FormData | Visitor;
    if (typeof citizenshipImage === "object" &&
      typeof driversLicenseImage === "object") {
      visitorData = new FormData();
      visitorData.append("_id", visitorId);
      visitorData.append("lastName", form.value.lastName);
      visitorData.append("firstName", form.value.firstName);
      visitorData.append("middleName", form.value.middleName);
      visitorData.append("suffix", form.value.suffix);
      visitorData.append("ssn", form.value.ssn);
      visitorData.append("dob", form.value.dob);
      visitorData.append("sex", form.value.sex);
      visitorData.append("prox", form.value.prox);
      visitorData.append("organization", form.value.organization);
      visitorData.append("image", citizenshipImage, citizenshipImage.name);
      visitorData.append("image", driversLicenseImage, driversLicenseImage.name);
    } else {
      visitorData = {
        lastName: form.value.lastName,
        firstName: form.value.firstName,
        middleName: form.value.middleName,
        suffix: form.value.suffix,
        ssn: form.value.ssn,
        dob: form.value.dob,
        sex: form.value.sex,
        prox: form.value.prox,
        organization: form.value.organization,
        driversLicenseImage: form.value.driversLicenseImage,
        citizenshipImage: form.value.citizenshipImage,
        _id: visitorId
      };
    }

    this.http.put(this.url + visitorId, visitorData).subscribe(
      success => {
        console.log(success);
        this.router.navigate(["/profile/" + visitorId]);
      }
    );
  }

  visitorsUpdatedEvent() {
    this.visitorsUpdated.next([...this.visitors]);
  }

  getVisitorUpdateListener() {
    return this.visitorsUpdated.asObservable();
  }

  deleteVisitor(id: string) {
    this.http.delete<{message: string}>(this.url + id)
    .subscribe(data => {
      if (data) {
        const updatedVisitors = this.visitors.filter(visitor => visitor._id !== id);
        this.visitors = updatedVisitors;
        this.visitorsUpdatedEvent();
        this.router.navigate(["/home"]);
      }
    });
  }
}
