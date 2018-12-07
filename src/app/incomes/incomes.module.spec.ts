import { IncomesModule } from './incomes.module';

describe('IncomesModule', () => {
  let incomesModule: IncomesModule;

  beforeEach(() => {
    incomesModule = new IncomesModule();
  });

  it('should create an instance', () => {
    expect(incomesModule).toBeTruthy();
  });
});
