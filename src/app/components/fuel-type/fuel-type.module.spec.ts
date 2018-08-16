import { FuelTypeModule } from './fuel-type.module';

describe('FuelTypeModule', () => {
  let fuelTypeModule: FuelTypeModule;

  beforeEach(() => {
    fuelTypeModule = new FuelTypeModule();
  });

  it('should create an instance', () => {
    expect(fuelTypeModule).toBeTruthy();
  });
});
