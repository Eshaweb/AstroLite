import { MatchMakingModule } from './match-making.module';

describe('MatchMakingModule', () => {
  let matchMakingModule: MatchMakingModule;

  beforeEach(() => {
    matchMakingModule = new MatchMakingModule();
  });

  it('should create an instance', () => {
    expect(matchMakingModule).toBeTruthy();
  });
});
