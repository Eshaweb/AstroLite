import { DeliveryAddressModule } from './delivery-address.module';

describe('DeliveryAddressModule', () => {
  let deliveryAddressModule: DeliveryAddressModule;

  beforeEach(() => {
    deliveryAddressModule = new DeliveryAddressModule();
  });

  it('should create an instance', () => {
    expect(deliveryAddressModule).toBeTruthy();
  });
});
