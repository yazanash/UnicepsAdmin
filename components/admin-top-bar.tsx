 "use client"
 import ModeToggle from "./mode-toggle"
 import { SidebarTrigger } from "@/components/ui/sidebar";
export default function AdminTopbar() {

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
      </div>
    </header>
  );
}