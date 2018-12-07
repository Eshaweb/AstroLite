import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstamangalaComponent } from './astamangala.component';

describe('AstamangalaComponent', () => {
  let component: AstamangalaComponent;
  let fixture: ComponentFixture<AstamangalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstamangalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstamangalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
