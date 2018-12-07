import { BudgetHomeModule } from './budget-home.module';

describe('BudgetHomeModule', () => {
  let budgetHomeModule: BudgetHomeModule;

  beforeEach(() => {
    budgetHomeModule = new BudgetHomeModule();
  });

  it('should create an instance', () => {
    expect(budgetHomeModule).toBeTruthy();
  });
});
