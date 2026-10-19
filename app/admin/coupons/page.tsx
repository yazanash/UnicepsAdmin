"use client";
import CouponTable from "./component/CouponTable";
import { SubscriptionCoupon } from "@/types/subscriptionCoupon";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
const CashRequestsPage = () => {
  const [cashRequests, setCashRequests] = useState<SubscriptionCoupon[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/SubscriptionCoupon`)
      .then((res) => {
        console.log(res);
        setCashRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan", err);
        setLoading(false);
      });
  });

  if (loading) return <div>جاري التحميل...</div>;
  if (!cashRequests) return <div>الخطة غير موجودة.</div>;
  return <CouponTable requests={cashRequests} />;
};

export default CashRequestsPage;
