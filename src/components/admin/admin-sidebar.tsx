import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Settings,
  Users,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function AdminSidebar() {
  const { pathname } = useLocation();

  const routes = [
    {
      to: "/admin",
      icon: LayoutDashboard,
      title: "Dashboard",
      exact: true,
    },
    {
      to: "/admin/quizzes",
      icon: FileText,
      title: "Quizzes",
    },
    {
      to: "/admin/results",
      icon: BarChart3,
      title: "Results",
    },
    {
      to: "/admin/users",
      icon: Users,
      title: "Users",
    },
    {
      to: "/admin/settings",
      icon: Settings,
      title: "Settings",
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b px-6 py-5">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">Quiz App</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-4 py-6">
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.to}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    route.exact
                      ? pathname === route.to
                      : pathname.startsWith(route.to)
                  }
                >
                  <Link to={route.to} className="flex items-center gap-3">
                    <route.icon className="h-5 w-5" />
                    {route.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <div className="mt-6">
            <Button className="w-full" asChild>
              <Link to="/admin/quizzes/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Quiz
              </Link>
            </Button>
          </div>
        </SidebarContent>
        <SidebarFooter className="border-t p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-medium text-primary-foreground">
                A
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
