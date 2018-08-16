import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTypeFormComponent } from './insurance-type-form.component';

describe('InsuranceTypeFormComponent', () => {
  let component: InsuranceTypeFormComponent;
  let fixture: ComponentFixture<InsuranceTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
