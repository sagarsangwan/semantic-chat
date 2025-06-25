"use client";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
function ChatItem({ chatRoom, setActiveChat, activeChat }) {
  return (
    <div>
      <div
        key={chatRoom.id}
        id={chatRoom.id}
        className="w-full justify-start h-12 border-b p-2 cursor-pointer"
        onClick={() => setActiveChat(chatRoom.id)}
      >
        <div className="flex w-full items-center gap-3 ">
          <div className="">
            <Avatar>
              <AvatarImage
                src={
                  chatRoom?.other_participant?.social_accounts?.[0]?.extra_data
                    ?.picture
                }
              />
            </Avatar>
            {/* <StatusIndicator status={chatroom.status} /> */}
          </div>
          <div className="flex-1 truncate text-left">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {
                  chatRoom?.other_participant?.social_accounts?.[0]?.extra_data
                    ?.name
                }
              </span>
              {chatRoom.unread > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {chatRoom.unread}
                </Badge>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {chatRoom.lastMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
