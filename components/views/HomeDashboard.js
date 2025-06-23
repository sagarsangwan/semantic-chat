"use client";

import { useState, useEffect } from "react";
// import { ChatSidebar } from "./chat-sidebar";

// import { ChatWindow } from "./chat-window";
// import { MessageInput } from "./message-input";
// import { ChatSummary } from "./chat-summary";
// import { useChat } from "ai/react";
// import { analyzeSentiment } from "@/lib/sentiment-analyzer";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "@/components/ui/sidebar";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { fetchChatRoomsApi } from "@/lib/api";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

function HomeDashboard() {
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
  return (
    <div>
      <div className="space-y-1 p-2">
        {chatRooms?.map((chatroom) => (
          <Button key={chatroom.id} variant="" className="w-full justify-start">
            <div className="flex w-full items-center gap-3 ">
              <div className="">
                <Avatar className="">
                  <AvatarImage
                    src={
                      chatroom?.other_participant?.social_accounts?.[0]
                        ?.extra_data?.picture
                    }
                    alt={
                      chatroom?.other_participant?.social_accounts?.[0]
                        ?.extra_data?.name
                    }
                  />
                </Avatar>
                {/* <StatusIndicator status={chatroom.status} /> */}
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
    </div>
  );
}

export default HomeDashboard;
