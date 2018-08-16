import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionTypeListComponent } from './transmission-type-list.component';

describe('TransmissionTypeListComponent', () => {
  let component: TransmissionTypeListComponent;
  let fixture: ComponentFixture<TransmissionTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissionTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
