 "use client"
 import ModeToggle from "./mode-toggle"
 import { SidebarTrigger } from "@/components/ui/sidebar";
 import { LogOut } from "lucide-react"; // أيقونة الخروج
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
export default function AdminTopbar() {
const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/Authentication/Logout");
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      window.location.href = "/auth/login";
    }
  };
  return (
    <header className="flex w-full items-center justify-between px-6 py-3 shadow-md">
      {/* Left side: اسم التطبيق أو القسم */}
      <SidebarTrigger/>
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Admin Dashboard
      </div>

      <div className="flex items-center space-x-4">
        {/* المستخدم */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="/images/pro-thump.png" // مسار الصورة
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-800 dark:text-gray-100">Admin</span>
        </div>
        <ModeToggle></ModeToggle>
        <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
      >
        <span className="text-sm font-medium">Logout</span>
        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
      </div>
    </header>
  );
}