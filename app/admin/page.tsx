"use client";
import { Users, DollarSign, ClipboardList, BarChart } from "lucide-react";
import StatCard from "./components/StatCard";
import HomeChart from "./components/HomeChart";
import { DashboardStats } from "@/types/dashboard";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
const Admin = () => {
  const [statstics, setStatstics] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/Stats`)
      .then((res) => {
        setStatstics(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan", err);
        setLoading(false);
      });
  });

  if (loading) return <div>جاري التحميل...</div>;
  if (!statstics) return <div>الخطة غير موجودة.</div>;

  const data = statstics;

  const stats = [
    { title: "Users", value: data.usersCount, icon: Users },
    { title: "Business Users", value: data.totalBusinessUsers, icon: BarChart },
    { title: "Revenue", value: data.revenue, icon: DollarSign },
    { title: "Cash Requests", value: data.cashRequests, icon: ClipboardList },
    { title: "Active Users", value: data.activeUsers, icon: BarChart },
  ];

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 ">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="overflow-x-auto grid grid-cols-2 rounded-lg shadow p-4">
        <div className="col-span-2">
          <HomeChart
            data={data.monthlyNewUsers}
            config={{
              normalUsers: { label: "Normal Users", color: "#2563eb" },
              businessUsers: { label: "Business Users", color: "#60a5fa" },
            }}
            axisKey="month"
            height={200}
            title="New Users (Monthly)"
          />
        </div>

        <HomeChart
          title="Active Subscriptions (Monthly)"
          data={data.activeSubscriptions}
          config={{
            active: { label: "Active Subscriptions", color: "#4ade80" },
          }}
          axisKey="month"
          height={200}
        />
        <HomeChart
          title="Training Sessions (Monthly)"
          data={data.trainingSessions}
          config={{
            sessions: { label: "Training Sessions", color: "#f97316" },
          }}
          axisKey="month"
          height={200}
        />
      </div>
    </div>
  );
};

export default Admin;
