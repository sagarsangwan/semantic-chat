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
  console.log(activeChatMessages?.messages);
  // if (activeChatLoading) {
  //   return <div>loading</div>;
  // }
  return (
    <div>
      <>
        <ChatHeader
          activeChatLoading={activeChatLoading}
          chatUserDetails={activeChatMessages?.other_participant}
        />
      </>
      <ScrollArea className="p-2 h-screen">
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
