import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistorListComponent } from './vistor-list.component';

describe('VistorListComponent', () => {
  let component: VistorListComponent;
  let fixture: ComponentFixture<VistorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
