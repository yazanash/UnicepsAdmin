"use client"
import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import AdminTopbar from "@/components/admin-top-bar";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/Admin/CheckAdminStatus"); 
        if (response.status === 200) {
          setIsAuthorized(true);
        } else if (response.status === 403){
          router.push("/");
        }
        else if (response.status === 401){
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);
  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#46cdcf] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#46cdcf] font-medium animate-pulse">Checking Permissions...</p>
        </div>
      </div>
    );
  }

  // إذا لم يكن مخولاً، لا نعرض شيئاً (سيتم تحويله في الـ useEffect)
  if (!isAuthorized) return null;
  return (
    <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange> 
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* <SidebarTrigger /> */}
        <AdminTopbar/>
        {children}
      </main>
    </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;
