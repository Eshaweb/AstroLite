import { HoropaidModule } from './horopaid.module';

describe('HoropaidModule', () => {
  let horopaidModule: HoropaidModule;

  beforeEach(() => {
    horopaidModule = new HoropaidModule();
  });

  it('should create an instance', () => {
    expect(horopaidModule).toBeTruthy();
  });
});
