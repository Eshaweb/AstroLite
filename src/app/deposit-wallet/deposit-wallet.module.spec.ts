import { DepositWalletModule } from './deposit-wallet.module';

describe('DepositWalletModule', () => {
  let depositWalletModule: DepositWalletModule;

  beforeEach(() => {
    depositWalletModule = new DepositWalletModule();
  });

  it('should create an instance', () => {
    expect(depositWalletModule).toBeTruthy();
  });
});
