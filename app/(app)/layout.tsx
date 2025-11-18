import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/server/AppSidebar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-14 border-b flex items-center px-4 bg-background">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              {/* You can add breadcrumbs or page title here */}
            </div>
            {/* User menu or other header actions */}
          </header>
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
