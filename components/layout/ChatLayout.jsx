import React, { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import ChatList from "../chat/ChatList";
import ChatWindow from "../chat/ChatWindow";
function ChatLayout({ chatRooms }) {
  const [activeChat, setActiveChat] = useState(null);
  const isMobile = useIsMobile();
  return (
    <div className="h-screen w-fill flex bg-white">
      {/* large Screen */}
      {!isMobile ? (
        <>
          <div className="w-1/3 border-r">
            <ChatList
              setActiveChat={setActiveChat}
              activeChat={activeChat}
              chatRooms={chatRooms}
            />
          </div>
          <div className="flex-1">
            {activeChat ? (
              <ChatWindow activeChat={activeChat} />
            ) : (
              <p className="flex h-full justify-center items-center">
                Click on any chat to start a conversation{" "}
              </p>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ChatLayout;
