import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionTypeFormComponent } from './transmission-type-form.component';

describe('TransmissionTypeFormComponent', () => {
  let component: TransmissionTypeFormComponent;
  let fixture: ComponentFixture<TransmissionTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissionTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
