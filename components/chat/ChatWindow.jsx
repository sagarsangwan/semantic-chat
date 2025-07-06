"use client";
import { fetchChatRoomMessagesApi } from "@/lib/api";
import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageItem from "./MessageItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./ChatInput";
import ChatLoading from "./ChatLoading";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
function ChatWindow({ activeChat }) {
  const { data: session, loading } = useSession();
  const [activeChatMessages, setActiveChatMessages] = useState([]);
  const [activeChatLoading, setActiveChatLoading] = useState(true);
  console.log(activeChatMessages);
  const socket = io("http://127.0.0.1:8000", {
    auth: {
      token: session?.access_token,
    },
  });

  useEffect(() => {
    socket.emit("join_room", { room_id: activeChat });

    socket.on("connect", () => {
      console.log(`connected to socket.io ${activeChat}`);
    });

    socket.on("chat_message", (msg) => {
      console.log("Received:", msg);
      // Handle adding to chat messages
      setActiveChatMessages((prev) => {
        if (!prev || !Array.isArray(prev.messages)) return prev;
        return {
          ...prev,
          messages: [...prev.messages, msg],
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [activeChat]);
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
  if (loading) {
    return <div>loading</div>;
  }
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
        <div></div>
      </ScrollArea>
      <ChatInput activeChat={activeChat} socket={socket} />
    </div>
  );
}

export default ChatWindow;
