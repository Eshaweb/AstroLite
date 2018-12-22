import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchMakingReportComponent } from './match-making-report.component';

describe('MatchMakingReportComponent', () => {
  let component: MatchMakingReportComponent;
  let fixture: ComponentFixture<MatchMakingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchMakingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchMakingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
