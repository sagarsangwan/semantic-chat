"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { fetchChatRoomsApi } from "@/lib/api";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const [chatRooms, setChatRooms] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatRooms = await fetchChatRoomsApi();
      console.log(chatRooms);
      setChatRooms(chatRooms);
    };
    fetchChatRooms();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatRooms?.map((room) => (
                <SidebarMenuItem key={room.name}>
                  <SidebarMenuButton asChild>
                    <p>{room.name}</p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
