"use client";
import {
  Users,
  DollarSign,
  ClipboardList,
  BarChart,
  DownloadIcon,
  DollarSignIcon,
  Package,
} from "lucide-react";
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
    { title: "Total Users", value: data.usersCount, icon: Users },
    { title: "Active Users (30d)", value: data.activeUsers, icon: BarChart },
    {
      title: "Total Downloads",
      value: data.totalDownloads,
      icon: DownloadIcon,
    },
    {
      title: "Unpaid Subscription",
      value: data.unpaidSubscriptionCount,
      icon: DollarSignIcon,
    },
    { title: "Revenue", value: data.revenue, icon: DollarSign },
    { title: "Cash Requests", value: data.cashRequests, icon: ClipboardList },
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
      <div className="p-6 rounded-lg border ">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" /> Subscriptions per Product
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.subscriptionsByProduct.map((prod) => (
            <div
              key={prod.productName}
              className="border p-3 rounded-md text-center"
            >
              <p className="text-base">{prod.productName}</p>
              <p className="text-xl font-bold">{prod.count}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto grid grid-cols-2 rounded-lg shadow p-4">
        <div className="col-span-2">
          <HomeChart
            data={data.monthlyNewUsers}
            config={{
              users: { label: "Users", color: "#2563eb" },
            }}
            axisKey="month"
            height={200}
            title="New Users (Monthly)"
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <HomeChart
            title="Active Subscriptions (Monthly)"
            data={data.activeSubscriptions}
            config={{
              active: { label: "Active Subscriptions", color: "#4ade80" },
            }}
            axisKey="month"
            height={200}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
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
    </div>
  );
};

export default Admin;
