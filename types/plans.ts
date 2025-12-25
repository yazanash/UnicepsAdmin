export interface PlanItem {
  id: number;
  price: number;
  durationString: string;
  daysCount: number;
  isFree: boolean;
  planId: string;
}

export interface Plan {
  id: string;
  name: string;
  productId: number; // 0 = Normal, 1 = Business
  planItems: PlanItem[];
}