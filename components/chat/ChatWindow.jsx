"use client";
import { fetchChatRoomMessagesApi } from "@/lib/api";
import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageItem from "./MessageItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./ChatInput";
import ChatLoading from "./ChatLoading";
function ChatWindow({ activeChat }) {
  const [activeChatMessages, setActiveChatMessages] = useState(null);
  const [activeChatLoading, setActiveChatLoading] = useState(true);
  useEffect(() => {
    const fetchChatRoomMessages = async () => {
      const activeChatMessagesFromApi = await fetchChatRoomMessagesApi(
        activeChat
      );
      setActiveChatMessages(activeChatMessagesFromApi);

      setActiveChatLoading(false);
    };
    fetchChatRoomMessages();
  }, [activeChat]);
  // if (activeChatLoading) {
  //   return <div>loading</div>;
  // }
  return (
    <div className="flex flex-col h-screen ">
      <ChatHeader
        activeChatLoading={activeChatLoading}
        chatUserDetails={activeChatMessages?.other_participant}
      />

      <ScrollArea className=" flex-1 overflow-y-auto  ">
        {activeChatLoading ? (
          <ChatLoading />
        ) : (
          <>
            {activeChatMessages?.messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </>
        )}
      </ScrollArea>
      <ChatInput />
    </div>
  );
}

export default ChatWindow;
