import React from "react";

function ChatLoading() {
  return (
    <div className=" p-2 h-screen">
      {Array.from({ length: 36 }).map((_, i) => (
        <div
          key={i}
          className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className="rounded-lg bg-gray-300 dark:bg-gray-700 p-3 w-2/3 max-w-[250px]"></div>
        </div>
      ))}
    </div>
  );
}

export default ChatLoading;
