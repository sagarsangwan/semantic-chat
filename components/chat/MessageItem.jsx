"use client";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import React from "react";

function MessageItem({ message }) {
  const { data: session, loading } = useSession();
  const isOwn = message.sender?.id === session?.user?.pk;
  const messageDate = parseISO(message.timestamp);
  const timeAgo = formatDistanceToNowStrict(messageDate, { addSuffix: true });

  if (loading) {
    return <div>hiiiiiiiiiiiiii</div>;
  }
  return (
    <div
      key={message.id}
      className={`flex px-4 py-1 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div className="flex-col">
        <div
          className={`max-w-xs sm:max-w-sm md:max-w-md break-words rounded-lg px-4 py-2 text-sm shadow-md   ${
            isOwn
              ? "bg-primary text-white dark:text-gray-900"
              : "bg-secondary text-dark dark:text-gray-200"
          } 
      `}
        >
          {!isOwn && (
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              {message?.sender?.username}
            </p>
          )}
          <p>{message.message}</p>
          <div className="flex justify-between items-center mt-1">
            {/* {sentiment && (
            <span className="text-[10px] text-purple-500 italic">
              {sentiment}
            </span>
          )} */}
          </div>
        </div>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">
          {timeAgo}
        </span>
      </div>
    </div>
  );
}

export default MessageItem;
