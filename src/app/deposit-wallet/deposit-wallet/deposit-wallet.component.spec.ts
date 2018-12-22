import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositWalletComponent } from './deposit-wallet.component';

describe('DepositWalletComponent', () => {
  let component: DepositWalletComponent;
  let fixture: ComponentFixture<DepositWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
