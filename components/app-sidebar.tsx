import {
  BarChart3,
  Home,
  BadgeDollarSign,
  PackageOpenIcon,
  HandCoins,
  Settings,
  DollarSignIcon,
  UploadIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: PackageOpenIcon,
  },
  {
    title: "Cash Requests",
    url: "/admin/cash-requests",
    icon: HandCoins,
  },
  {
    title: "PaymentGateway",
    url: "/admin/payment-gateway",
    icon: DollarSignIcon,
  },
  {
    title: "Settings",
    url: "/admin/site-settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row items-center">
          <Image
            src="/Logo/Uni-Logo.png"
            alt="Uniceps logo"
            width={40}
            height={40}
            className="mr-2"
          ></Image>
          <div>Uniceps - Admin</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
