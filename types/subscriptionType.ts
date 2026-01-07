export interface SubscriptionType{
    id :string;
    email:string; 
    plan:string; 
    price:number; 
    startDate?:Date; 
    endDate?:Date;
}