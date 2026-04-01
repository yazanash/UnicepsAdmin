"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { LicenseType } from "@/types/products";
import LicenseTable from "../components/LicenseTable";

const Licenses = () => {
  const [licenses, setLicenses] = useState<LicenseType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLicenses = () => {
    setLoading(true);
    api
      .get(`/Licenses`) // تأكد من المسار الصحيح للـ API
      .then((res) => {
        setLicenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching licenses", err);

        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLicenses();
  }, []); // تأكد من مصفوفة التبعيات فارغة لمنع التكرار

  if (loading) return <div className="p-10 text-center">جاري التحميل...</div>;
  if (!licenses)
    return <div className="p-10 text-center">لا توجد تراخيص حالياً.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Uniceps Licenses</h1>
        {/* زر إضافة ترخيص جديد مستقبلاً */}
      </div>
      <LicenseTable licenses={licenses} />
    </div>
  );
};

export default Licenses;
