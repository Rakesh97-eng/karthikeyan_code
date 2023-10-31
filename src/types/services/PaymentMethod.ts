export interface PaymentMethod {
  id: string;
  customerId: string;
  name: string;
  number: string;
  brand: string;
  expMonth: number;
  expYear: number;
  token: string;
  idDefault: boolean;
  boulevardCardPaymentMethodId: string;
}
