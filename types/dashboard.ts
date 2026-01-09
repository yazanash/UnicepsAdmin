export interface MonthlyNewUsers {
  month: string;
  users: number;
}
export interface SubscriptionsByProduct {
  productName: string;
  count: number;
}
export interface ActiveSubscriptions {
  month: string;
  active: number;
}

export interface TrainingSessions {
  month: string;
  sessions: number;
}

export interface DashboardStats {
  usersCount: number;
  activeUsers: number;
  totalDownloads: number;
  unpaidSubscriptionCount: number;
  revenue: number;
  cashRequests: number;
  subscriptionsByProduct: SubscriptionsByProduct[];
  monthlyNewUsers: MonthlyNewUsers[];
  activeSubscriptions: ActiveSubscriptions[];
  trainingSessions: TrainingSessions[];
}