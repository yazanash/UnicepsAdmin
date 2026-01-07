"use client";
import SubscriptionsTable from "./components/subscriptionTable";
import { SubscriptionType } from "@/types/subscriptionType";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
const SubscriptionsPage = () => {
  const [subscriptions, setSubscription] = useState<SubscriptionType[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/Membership/pending-subscriptions`)
      .then((res) => {
        if (res.status === 200) {
          // --- التحويل الهام جداً هنا ---
          const formattedData = res.data.map((item: any) => ({
            ...item,
            startDate: item.startDate ? new Date(item.startDate) : undefined,
            endDate: item.endDate ? new Date(item.endDate) : undefined,
          }));

          setSubscription(formattedData);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error fetching plans", err);
        setLoading(false);
      });
  }, []); // <--- لا تنسى الـ [] لتشغيل الكود مرة واحدة فقط عند فتح الصفحة

  if (loading) return <div className="p-10 text-center">جاري التحميل...</div>;
  if (!subscriptions || subscriptions.length === 0)
    return (
      <div className="p-10 text-center">لا يوجد اشتراكات معلقة حالياً</div>
    );

  return <SubscriptionsTable subs={subscriptions} />;
};

export default SubscriptionsPage;
