import { HoroscopeModule } from './horoscope.module';

describe('HoroscopeModule', () => {
  let horoscopeModule: HoroscopeModule;

  beforeEach(() => {
    horoscopeModule = new HoroscopeModule();
  });

  it('should create an instance', () => {
    expect(horoscopeModule).toBeTruthy();
  });
});
