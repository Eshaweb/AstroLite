import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopeFreeComponent } from './horoscope-free.component';

describe('HoroscopeFreeComponent', () => {
  let component: HoroscopeFreeComponent;
  let fixture: ComponentFixture<HoroscopeFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoroscopeFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroscopeFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
