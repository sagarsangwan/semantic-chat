"use client";
import { useSession } from "next-auth/react";
import React from "react";

function MessageItem({ message }) {
  const { data: session, loading } = useSession();
  console.log(session);
  const isOwn = message.sender?.id === session?.user?.pk;
  if (loading) {
    return <div>hiiiiiiiiiiiiii</div>;
  }
  return (
    <div
      key={message.id}
      className={`flex px-4 py-1 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md break-words rounded-lg px-4 py-2 text-sm shadow-md
      `}
      >
        {!isOwn && (
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
            {message?.sender?.username}
          </p>
        )}
        <p>{message.message}</p>
        <div className="flex justify-between items-center mt-1">
          {/* <span className="text-[10px] text-gray-500 dark:text-gray-400">
            {timestamp}
          </span> */}
          {/* {sentiment && (
            <span className="text-[10px] text-purple-500 italic">
              {sentiment}
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
