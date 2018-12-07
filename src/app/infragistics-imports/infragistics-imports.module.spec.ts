import { InfragisticsImportsModule } from './infragistics-imports.module';

describe('InfragisticsImportsModule', () => {
  let infragisticsImportsModule: InfragisticsImportsModule;

  beforeEach(() => {
    infragisticsImportsModule = new InfragisticsImportsModule();
  });

  it('should create an instance', () => {
    expect(infragisticsImportsModule).toBeTruthy();
  });
});
