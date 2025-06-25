"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";

import { fetchChatRoomsApi } from "@/lib/api";
import ChatItem from "./ChatItem";

function ChatList({ chatRooms, setActiveChat, activeChat }) {
  return (
    <div className="space-y-1 p-2">
      <ScrollArea className="h-full min-h-screen  rounded-md  py-4">
        {chatRooms?.map((chatRoom) => (
          <ChatItem
            key={chatRoom.id}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            chatRoom={chatRoom}
          />
        ))}
      </ScrollArea>
    </div>
  );
}

export default ChatList;
