"use client";

import { Home, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ModeToggle } from "../ui/theme-toggle";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
export function ChatSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: session, loading } = useSession();
  if (loading) {
    return <div>loadinggggg</div>;
  }
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-background border-r border-border flex-col items-center py-4 z-40">
        {/* Logo/Home at top */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Home className="w-6 h-6" />
          </Button>
        </div>

        {/* Middle navigation items */}
        <div className="flex-1 flex flex-col gap-4">
          <ModeToggle />
        </div>

        <Avatar>
          <AvatarImage src={session?.user?.image} />
        </Avatar>
        <p>{session?.user?.name}</p>
        <Button onClick={() => signOut()} variant="outline">
          <LogOut />
        </Button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
        <div className="flex items-center justify-around px-4 py-2 safe-area-pb"></div>
      </div>

      {/* Mobile content spacer */}
      <div className="md:hidden h-20" />
    </>
  );
}
