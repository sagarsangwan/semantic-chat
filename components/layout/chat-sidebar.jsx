// "use client";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { useSession } from "next-auth/react";
// import { fetchChatRoomsApi } from "@/lib/api";
// import { useEffect, useState } from "react";

// export function AppSidebar() {
//   if (loading) {
//     return <div>loading</div>;
//   }
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {chatRooms?.map((room) => (
//                 <SidebarMenuItem key={room.name}>
//                   <SidebarMenuButton asChild>
//                     <p>{room.name}</p>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  User,
  MessageSquare,
  Settings,
  Bell,
  Moon,
  Sun,
  X,
  Circle,
  CheckCircle2,
} from "lucide-react";
import { fetchChatRoomsApi } from "@/lib/api";
import { useSession } from "next-auth/react";

// Status options
// StatusType = "online" | "away" | "busy" | "offline";

const chatroom = {
  id: "string",
  name: "string",
  avatar: "string",
  status: "StatusType",
  unread: "number",
  lastMessage: "string",
};

export function ChatSidebar({ open, setOpen }) {
  const { data: session, status } = useSession();
  const [chatRooms, setChatRooms] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRooms = await fetchChatRoomsApi();
      setChatRooms(chatRooms);
    };
    fetchChatRooms();
    setLoading(false);
  }, []);
  console.log(chatRooms);

  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(false);
  // const [status, setStatus] = useState("online");

  // Sample chatrooms data

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    const statusColors = {
      online: "bg-green-500",
      away: "bg-yellow-500",
      busy: "bg-red-500",
      offline: "bg-gray-400",
    };

    return (
      <span
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${statusColors[status]}`}
      />
    );
  };

  // Render sidebar content
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* User profile section */}
      <div className="flex flex-col items-center space-y-2 border-b p-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session?.user?.image} alt="User" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          {/* <StatusIndicator status={status} /> */}
        </div>
        <h2 className="text-lg font-semibold">{session?.user?.name}</h2>

        <div className="flex gap-2">
          <Button
            variant={status === "online" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={() => setStatus("online")}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span className="sr-only">Online</span>
          </Button>
          <Button
            variant={status === "away" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={() => setStatus("away")}
          >
            <Circle className="h-4 w-4" />
            <span className="sr-only">Away</span>
          </Button>
          <Button
            variant={status === "busy" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={() => setStatus("busy")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Busy</span>
          </Button>
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4">
          <h3 className="mb-2 text-sm font-medium">Conversations</h3>
        </div>
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="space-y-1 p-2">
            {chatRooms?.map((chatroom) => (
              <Button
                key={chatroom.id}
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex w-full items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={
                          chatroom?.other_participant?.social_accounts?.[0]
                            ?.extra_data?.picture
                        }
                        alt={chatroom.name}
                      />
                      <AvatarFallback>{chatroom.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <StatusIndicator status={chatroom.status} />
                  </div>
                  <div className="flex-1 truncate text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {
                          chatroom?.other_participant?.social_accounts?.[0]
                            ?.extra_data?.name
                        }
                      </span>
                      {chatroom.unread > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {chatroom.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {chatroom.lastMessage}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Footer with actions */}
      <div className="border-t p-4">
        <div className="flex justify-between">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );

  // Render sidebar based on mobile or desktop
  return isMobile ? (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[280px] p-0 sm:max-w-none">
        {sidebarContent}
      </SheetContent>
    </Sheet>
  ) : (
    <div
      className={`border-r bg-card transition-all duration-300 ${
        open ? "w-[280px]" : "w-0"
      }`}
    >
      {open && sidebarContent}
    </div>
  );
}
