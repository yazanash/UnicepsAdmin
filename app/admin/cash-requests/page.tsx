"use client";
import CashRequestTable from "./components/CashRequestTable";
import { CashRequestType } from "@/types/cashrequest";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
const CashRequestsPage = () => {
  const [cashRequests, setCashRequests] = useState<CashRequestType[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/CashRequest`)
      .then((res) => {
        console.log(res)
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
  return <CashRequestTable requests={cashRequests} />;
};

export default CashRequestsPage;
