"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Home, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/useUIStore";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Courses",
      href: "/courses",
      icon: BookOpen,
    },
    {
      name: "Learning Path",
      href: "/learning-path",
      icon: GraduationCap,
    },
    {
      name: "Progress",
      href: "/progress",
      icon: TrendingUp,
    },
    {
      name: "Community",
      href: "/community",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Learn To Code</p>
              <p>v1.0.0</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export { Sidebar };
