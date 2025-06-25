import React from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Image from "next/image";

function ChatHeader({ chatUserDetails, onBack, activeChatLoading }) {
  const status = false;
  if (activeChatLoading) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 border-b animate-pulse">
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-950">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <Image
          src={chatUserDetails?.social_accounts?.[0]?.extra_data?.picture}
          alt="user"
          height={10}
          width={10}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-medium text-gray-900 dark:text-white">
            {chatUserDetails?.username}
          </h2>
          {status && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{status}</p>
          )}
        </div>
      </div>

      <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ChatHeader;
