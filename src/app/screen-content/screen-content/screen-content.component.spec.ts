import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenContentComponent } from './screen-content.component';

describe('ScreenContentComponent', () => {
  let component: ScreenContentComponent;
  let fixture: ComponentFixture<ScreenContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
