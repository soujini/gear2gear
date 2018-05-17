import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionTypeComponent } from './transmission-type.component';

describe('TransmissionTypeComponent', () => {
  let component: TransmissionTypeComponent;
  let fixture: ComponentFixture<TransmissionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
