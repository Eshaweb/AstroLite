import { AstamangalaModule } from './astamangala.module';

describe('AstamangalaModule', () => {
  let astamangalaModule: AstamangalaModule;

  beforeEach(() => {
    astamangalaModule = new AstamangalaModule();
  });

  it('should create an instance', () => {
    expect(astamangalaModule).toBeTruthy();
  });
});
