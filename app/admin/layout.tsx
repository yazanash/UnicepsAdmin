
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import AdminTopbar from "@/components/admin-top-bar";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
