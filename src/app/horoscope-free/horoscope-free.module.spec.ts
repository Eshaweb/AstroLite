import { HoroscopeFreeModule } from './horoscope-free.module';

describe('HoroscopeFreeModule', () => {
  let horoscopeFreeModule: HoroscopeFreeModule;

  beforeEach(() => {
    horoscopeFreeModule = new HoroscopeFreeModule();
  });

  it('should create an instance', () => {
    expect(horoscopeFreeModule).toBeTruthy();
  });
});
