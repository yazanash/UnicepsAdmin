export interface CashRequestType {
  id: String;
  email: String;
  paymentGateway: String;
  subscription: String;
  transferCode: String;
  status: String;
  createdAt: String;
  subscriptionPrice: number;
  couponCode: string | null;
  couponValue: number;
  finalPrice: number;
}
