import { MatchMakingReportModule } from './match-making-report.module';

describe('MatchMakingReportModule', () => {
  let matchMakingReportModule: MatchMakingReportModule;

  beforeEach(() => {
    matchMakingReportModule = new MatchMakingReportModule();
  });

  it('should create an instance', () => {
    expect(matchMakingReportModule).toBeTruthy();
  });
});
