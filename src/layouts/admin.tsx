import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  BarChart,
  Menu,
  X,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Quizzes",
    href: "/admin/quizzes",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <h1 className="text-xl font-bold">QuizLoom Admin</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="space-y-1 p-4">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          isSidebarOpen ? "md:pl-64" : "pl-0",
        )}
      >
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
