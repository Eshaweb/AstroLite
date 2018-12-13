import { HoroscopePaidServiceModule } from './horoscope-paid-service.module';

describe('HoroscopePaidServiceModule', () => {
  let horoscopePaidServiceModule: HoroscopePaidServiceModule;

  beforeEach(() => {
    horoscopePaidServiceModule = new HoroscopePaidServiceModule();
  });

  it('should create an instance', () => {
    expect(horoscopePaidServiceModule).toBeTruthy();
  });
});
