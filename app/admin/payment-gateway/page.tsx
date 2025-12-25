"use client"
import { PaymentGateway } from '@/types/payment-gateway';
import PaymentGatewayTable from './components/PaymentGatewayTable';
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
const PaymentGatewayPage = () => {
   const [gateways, setGateways] = useState<PaymentGateway[] | null>(null);
      const [loading, setLoading] = useState(true);
     useEffect(() => {
      api
        .get(`/PaymentGateway`)
        .then((res) => {
          setGateways(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching plan", err);
          setLoading(false);
        });
    });
  
    if (loading) return <div>جاري التحميل...</div>;
    if (!gateways) return <div>الخطة غير موجودة.</div>;
  return (
    <PaymentGatewayTable gateways={gateways}/>
  )
}

export default PaymentGatewayPage