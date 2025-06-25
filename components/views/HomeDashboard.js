"use client";
import ChatList from "../chat/ChatList";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { fetchChatRoomsApi } from "@/lib/api";
import ChatLayout from "../layout/ChatLayout";
function HomeDashboard() {
  const { data: session, status } = useSession();
  const [chatRooms, setChatRooms] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRooms = await fetchChatRoomsApi();
      setChatRooms(chatRooms);
      console.log(chatRooms);
    };
    fetchChatRooms();
    setLoading(false);
  }, []);
  return (
    <div>
      {/* <ChatList chatRooms={chatRooms} /> */}
      <ChatLayout chatRooms={chatRooms} />
    </div>
  );
}

export default HomeDashboard;
