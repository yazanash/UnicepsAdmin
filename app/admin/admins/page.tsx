"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserPlus, ShieldCheck, Mail, Loader2, Trash2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminUser {
  id: string;
  email: string;
  name?: string;
}

const ManageAdmins = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 1. جلب قائمة الأدمنز عند تحميل الصفحة
  const fetchAdmins = async () => {
    try {
      const res = await api.get("/Admin/GetAdmins");
      setAdmins(res.data);
    } catch (err) {
      console.error("Failed to fetch admins");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 2. ترقية مستخدم جديد
  const handlePromoteToAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await api.post("/Admin/AddAdminRole", { email });
      setMessage({ type: "success", text: `تمت ترقية ${email} بنجاح!` });
      setEmail("");
      fetchAdmins(); // تحديث القائمة بعد الإضافة
    } catch (err: any) {
      setMessage({ type: "error", text: "فشلت العملية، تأكد من وجود الحساب." });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. سحب صلاحية الأدمن
  const handleRevokeAdmin = async (id: string) => {
    if (!confirm("هل أنت متأكد من سحب صلاحيات الأدمن من هذا المستخدم؟")) return;
    try {
      await api.delete(`/Admin/RevokeAdmin/${id}`);
      setAdmins(admins.filter((a) => a.id !== id));
    } catch (err) {
      alert("حدث خطأ أثناء سحب الصلاحية.");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* القسم الأول: إضافة أدمن جديد */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <UserPlus className="text-[#46cdcf]" />
              إضافة مسؤول جديد
            </CardTitle>
            <CardDescription>أدخل البريد الإلكتروني للمستخدم لترقيته إلى رتبة مسؤول.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePromoteToAdmin} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  type="email"
                  placeholder="admin@uniceps.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-black/20 border-white/10 text-white focus:ring-[#46cdcf]"
                  required
                />
              </div>
              <Button disabled={isLoading} className="bg-[#46cdcf] text-black hover:bg-[#3bb3b5] px-8">
                {isLoading ? <Loader2 className="animate-spin" /> : "ترقية الآن"}
              </Button>
            </form>
            {message && (
              <p className={`mt-3 text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {message.text}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* القسم الثاني: قائمة الأدمنز الحالية */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="text-[#46cdcf]" />
          المسؤولون الحاليون
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {isFetching ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="h-24 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
              ))
            ) : admins.length > 0 ? (
              admins.map((admin) => (
                <motion.div
                  key={admin.id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="group relative bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#46cdcf] to-[#0095A6] flex items-center justify-center text-black font-bold">
                      {admin.email[0].toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-white font-medium truncate">{admin.email}</p>
                      <p className="text-xs text-[#46cdcf]">Active Admin</p>
                    </div>
                    <button
                      onClick={() => handleRevokeAdmin(admin.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                      title="سحب الصلاحية"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                <ShieldAlert className="mx-auto text-gray-600 mb-2" size={40} />
                <p className="text-gray-500">لا يوجد مسؤولون آخرون حالياً.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageAdmins;