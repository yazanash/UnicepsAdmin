export interface MonthlyNewUsers {
  month: string;
  normalUsers: number;
  businessUsers: number;
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
  totalBusinessUsers: number;
  revenue: number;
  cashRequests: number;
  activeUsers: number;
  monthlyNewUsers: MonthlyNewUsers[];
  activeSubscriptions: ActiveSubscriptions[];
  trainingSessions: TrainingSessions[];
}