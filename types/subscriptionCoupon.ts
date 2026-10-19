export interface SubscriptionCoupon {
  id: number;
  code: string;
  createdAt: Date;
  expirationAt: Date;
  descriptionMessage: string;
  couponValue: number;
}
