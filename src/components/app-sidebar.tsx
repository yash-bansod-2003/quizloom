import * as React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileQuestion,
  Settings,
  Users,
  BarChart3,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { NavUser } from "@/components/nav-user";
import { useGetSessionQuery } from "@/services/authentication";
import { Icons } from "./icons";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    title: "Quizzes",
    url: "/dashboard/quizzes",
    icon: <FileQuestion className="size-5" />,
  },
  {
    title: "Results",
    url: "/dashboard/results",
    icon: <BarChart3 className="size-5" />,
  },
  {
    title: "Participants",
    url: "/dashboard/participants",
    icon: <Users className="size-5" />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings className="size-5" />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading } = useGetSessionQuery();
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Icons.logo className="size-8" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">QuizLoom</span>
                  <span className="">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className="font-medium flex items-center gap-3"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {!isLoading && data && (
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
