import React, { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import ChatList from "../chat/ChatList";
import ChatWindow from "../chat/ChatWindow";
import { ChatSidebar } from "./chat-sidebar";
import ChatListHeader from "../chat/ChatListHeader";
function ChatLayout({ chatRooms }) {
  const [activeChat, setActiveChat] = useState(null);
  const isMobile = useIsMobile();
  return (
    <div className="h-screen w-full  flex  overflow-hidden">
      {/* large Screen */}
      {!isMobile ? (
        <>
          <div className="grid grid-cols-5 w-xs border-r ">
            <div className="col-span-1">
              <ChatSidebar />
            </div>
            <div className="col-span-4 ">
              <ChatListHeader />
              <ChatList
                setActiveChat={setActiveChat}
                activeChat={activeChat}
                chatRooms={chatRooms}
              />
            </div>
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
