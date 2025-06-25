"use client";
import { fetchChatRoomMessagesApi } from "@/lib/api";
import React, { useEffect, useState } from "react";

function ChatWindow({ activeChat }) {
  const [activeChatMessages, setActiveChatMessages] = useState(null);
  useEffect(() => {
    const fetchChatRoomMessages = async () => {
      const activeChatMessagesFromApi = await fetchChatRoomMessagesApi(
        activeChat
      );
      setActiveChatMessages(activeChatMessagesFromApi);
      console.log(activeChatMessagesFromApi);
    };
    fetchChatRoomMessages();
  }, [activeChat]);
  return <div>hello {activeChat}</div>;
}

export default ChatWindow;
