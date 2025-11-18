import "server-only";
import { Home, LucideProps, User, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { logout } from "@/app/actions/auth"; // Import the logout action

export default async function AppSidebar() {
  const session = await getSession();

  let items: {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[] = [];

  // SIDEBAR
  // ADMIN
  if (session?.role === "ADMIN") {
    items = [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Users",
        url: "/users",
        icon: User,
      },
    ];
  }
  // USER
  else if (session?.role === "USER") {
    items = [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
    ];
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <form action={logout}>
                  <SidebarMenuButton asChild>
                    <button type="submit" className="w-full text-left">
                      <LogOut />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </form>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
