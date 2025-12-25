export interface PaymentGateway{
    id: Number;
    name: string;
    transferInfo: string;
    isActive: boolean;
}