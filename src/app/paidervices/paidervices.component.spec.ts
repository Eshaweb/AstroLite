import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidervicesComponent } from './paidervices.component';

describe('PaidervicesComponent', () => {
  let component: PaidervicesComponent;
  let fixture: ComponentFixture<PaidervicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidervicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidervicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
