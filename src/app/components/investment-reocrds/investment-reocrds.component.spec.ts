import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentReocrdsComponent } from './investment-reocrds.component';

describe('InvestmentReocrdsComponent', () => {
  let component: InvestmentReocrdsComponent;
  let fixture: ComponentFixture<InvestmentReocrdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentReocrdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentReocrdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
