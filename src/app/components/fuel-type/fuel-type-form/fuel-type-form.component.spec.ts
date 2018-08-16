import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelTypeFormComponent } from './fuel-type-form.component';

describe('FuelTypeFormComponent', () => {
  let component: FuelTypeFormComponent;
  let fixture: ComponentFixture<FuelTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
