import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { VisitorService } from "../visitor.service";
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { Visitor } from "src/app/classes/visitor";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-vistor-list",
  templateUrl: "./vistor-list.component.html",
  styleUrls: ["./vistor-list.component.css"]
})
export class VistorListComponent implements OnInit, OnDestroy {
  private visitors: Visitor[];
  private visitorsSub: Subscription;
  displayedColumns = ["last", "first", "organization"];
  dataSource = this.visitors;

  @Output()
  selectedVisitor: EventEmitter<Visitor> = new EventEmitter();

  constructor(private visitorService: VisitorService, private router: Router) {
    this.visitors = [];
  }

  ngOnInit() {
    this.visitorService.getAllVisitors();
    this.visitorsSub = this.visitorService
      .getVisitorUpdateListener()
      .subscribe((visitors: Visitor[]) => {
        this.visitors = visitors;
        console.log(this.visitors);
        this.dataSource = this.visitors;
      });
  }

  ngOnDestroy() {
    this.visitorsSub.unsubscribe();
  }

  selectVisitor(selectedVisitor: Visitor) {
    console.log("selected", selectedVisitor.firstName);
    this.selectedVisitor.emit(selectedVisitor);
    this.router.navigate(['/', 'profile', selectedVisitor._id]);
  }
}
