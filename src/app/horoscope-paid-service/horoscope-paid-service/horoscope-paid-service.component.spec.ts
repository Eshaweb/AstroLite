import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopePaidServiceComponent } from './horoscope-paid-service.component';

describe('HoroscopePaidServiceComponent', () => {
  let component: HoroscopePaidServiceComponent;
  let fixture: ComponentFixture<HoroscopePaidServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoroscopePaidServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroscopePaidServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
