import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoropaidComponent } from './horopaid.component';

describe('HoropaidComponent', () => {
  let component: HoropaidComponent;
  let fixture: ComponentFixture<HoropaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoropaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoropaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
