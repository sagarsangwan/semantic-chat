"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { sendMessageApi } from "@/lib/api";

function ChatInput({ activeChat, socket }) {
  const [currentMessage, setCurentMessage] = useState(null);
  const { data: session, loading } = useSession();

  const sendMessage = async () => {
    const data = {
      sender: session?.user?.pk,
      message: currentMessage,
      room: activeChat,
      timestamp: new Date().toISOString(),
    };
    socket.emit("chat_message", data);
    // const result = await sendMessageApi(data, activeChat);
    // if (result.status == "ok") {
    //   setCurentMessage(null);
    // } else {
    //   console.log(result);
    // }
  };
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="flex flex-row p-2 gap-1">
      <Textarea
        onChange={(e) => {
          setCurentMessage(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          sendMessage();
        }}
        className="self-end"
      >
        <Send />
      </Button>
    </div>
  );
}

export default ChatInput;
