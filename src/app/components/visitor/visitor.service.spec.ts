import { TestBed } from "@angular/core/testing";

import { VisitorService } from "./visitor.service";

describe("RequestService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: VisitorService = TestBed.get(VisitorService);
    expect(service).toBeTruthy();
  });
});
