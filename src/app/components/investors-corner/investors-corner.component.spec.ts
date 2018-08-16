import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsCornerComponent } from './investors-corner.component';

describe('InvestorsCornerComponent', () => {
  let component: InvestorsCornerComponent;
  let fixture: ComponentFixture<InvestorsCornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorsCornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
