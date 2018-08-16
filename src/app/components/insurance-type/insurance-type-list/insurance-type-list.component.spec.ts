import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTypeListComponent } from './insurance-type-list.component';

describe('InsuranceTypeListComponent', () => {
  let component: InsuranceTypeListComponent;
  let fixture: ComponentFixture<InsuranceTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
