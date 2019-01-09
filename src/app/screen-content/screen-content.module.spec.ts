import { ScreenContentModule } from './screen-content.module';

describe('ScreenContentModule', () => {
  let screenContentModule: ScreenContentModule;

  beforeEach(() => {
    screenContentModule = new ScreenContentModule();
  });

  it('should create an instance', () => {
    expect(screenContentModule).toBeTruthy();
  });
});
