"use server";
import axios from "axios";
import { auth } from "./auth";
import { headers } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Automatically attach access token from session to headers
api.interceptors.request.use(async (config) => {
  const session = await auth();
  if (session && session.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export const fetchChatRoomsApi = async () => {
  const session = await auth();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}chatrooms/`,
    {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    }
  );

  const data = await response.json();

  return data;
};

export const fetchChatRoomMessagesApi = async (chatroomId) => {
  const session = await auth();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}chatrooms/${chatroomId}`,
    {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const sendMessageApi = async (data, chatroomId) => {
  const session = await auth();
  console.log(JSON.stringify(data));
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}chatrooms/send-message/${chatroomId}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  console.log(result);
  return result;
};
