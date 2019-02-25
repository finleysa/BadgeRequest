import { Visitor } from "./../../../classes/visitor";
import { Component, OnInit, Input } from "@angular/core";
import { VisitorService } from "../visitor.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-visitor-profile",
  templateUrl: "./visitor-profile.component.html",
  styleUrls: ["./visitor-profile.component.css"]
})
export class VisitorProfileComponent implements OnInit {
  @Input()
  selectedVisitor: Visitor;
  displaySsn = false;
  properties: any;

  constructor(private visitorService: VisitorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((pm) => {
      if (pm.has('visitorId')) {
        const visitorId = pm.get('visitorId');
        this.visitorService.getVisitor(visitorId).subscribe(data => {
          this.selectedVisitor = data;
          this.properties = Object.keys(data);
        });
      }
    });
  }

  showSsn() {
    this.displaySsn = !this.displaySsn;
  }

  onDelete(id: string) {
    this.visitorService.deleteVisitor(id);
  }
}
