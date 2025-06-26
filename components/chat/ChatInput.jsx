"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";

function ChatInput() {
  const [currentMessage, setCurentMessage] = useState(null);
  const { data: session, loading } = useSession();
  console.log(currentMessage);
  const sendMessage = () => {};
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
      <Button className="self-end">
        <Send />
      </Button>
    </div>
  );
}

export default ChatInput;
