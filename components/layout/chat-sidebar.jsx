"use client";

import { Home, Settings, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatSidebar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar collapsible="none" className="hidden md:flex w-16 border-r">
        <SidebarHeader className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton size="lg" className="w-12 h-12 p-0">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Home className="size-4" />
                      </div>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Home</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton className="w-12 h-12 p-0">
                      <Settings className="size-5" />
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      className="w-12 h-12 p-0"
                      onClick={toggleTheme}
                    >
                      {theme === "dark" ? (
                        <Sun className="size-5" />
                      ) : (
                        <Moon className="size-5" />
                      )}
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{theme === "dark" ? "Light Mode" : "Dark Mode"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      className="w-12 h-12 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-5" />
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="flex items-center justify-around p-2 max-w-md mx-auto">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Home className="size-5" />
            <span className="sr-only">Home</span>
          </Button>

          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Settings className="size-5" />
            <span className="sr-only">Settings</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
            <span className="sr-only">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
}
