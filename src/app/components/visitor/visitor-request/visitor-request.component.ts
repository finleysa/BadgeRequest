import { Visitor } from "../../../classes/visitor";
import { VisitorService } from "../visitor.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { mimeType } from "./mime-type.validator";

enum mode {
  create = "CREATE",
  edit = "EDIT"
}

@Component({
  selector: "app-visitor-request",
  templateUrl: "./visitor-request.component.html",
  styleUrls: ["./visitor-request.component.scss"]
})
export class VisitorPageComponent implements OnInit {
  visitor = new Visitor();
  driversLicenseImage: any;
  citizenshipImage: any;
  isLoading = false;
  serverMessage: { message: string; success: boolean };
  form: FormGroup;
  mode = mode.create;
  visitorId: string;

  constructor(private visitorService: VisitorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      lastName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      middleName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      suffix: new FormControl(null, {validators: [Validators.minLength(3)]}),
      dob: new FormControl(null, {validators: [Validators.required]}),
      organization: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      ssn: new FormControl(null, {validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)]}),
      citizenshipImage: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      driversLicenseImage: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((pm) => {
      if (pm.has('visitorId')) {
        this.mode = mode.edit;
        this.visitorId = pm.get('visitorId');
        this.visitorService.getVisitor(this.visitorId).subscribe(data => {
          this.visitor = data;
          console.log(this.visitor);
          this.form.setValue({
            firstName: this.visitor.firstName || null,
            lastName: this.visitor.lastName || null,
            middleName: this.visitor.middleName || null,
            suffix: this.visitor.suffix || null,
            dob: this.visitor.dob || null,
            organization: this.visitor.organization || null,
            ssn: this.visitor.ssn || null,
            citizenshipImage: this.visitor.citizenshipImage || null,
            driversLicenseImage: this.visitor.driversLicenseImage  || null
          });
        });

      } else {
        this.mode = mode.create;
      }
    });
  }

  onSubmit() {
    console.log(this.mode);
    if (this.mode === mode.create) {
      this.visitorService.addVisitorRequest(
        this.form,
        this.citizenshipImage,
        this.driversLicenseImage
      );
    } else if (this.mode === mode.edit) {
      this.visitorService.updateVisitorRequest(
        this.form,
        this.citizenshipImage,
        this.driversLicenseImage,
        this.visitorId);
    }
  }
  onFileChange(event, image: string) {
    if (image === "citizenshipImage") {
      this.citizenshipImage = <File>event.target.files[0];
      this.form.patchValue({ citizenshipImage: this.citizenshipImage });
      this.form.get("citizenshipImage").updateValueAndValidity();
    } else if (image === "driversLicenseImage") {
      this.driversLicenseImage = <File>event.target.files[0];
      this.form.patchValue({ driversLicenseImage: this.driversLicenseImage });
      this.form.get("driversLicenseImage").updateValueAndValidity();
    }
  }
}
