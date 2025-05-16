"use server";
import axios from "axios";
import { auth } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api", // Your Django API base
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Automatically attach access token from session to headers
api.interceptors.request.use(async (config) => {
  const session = await auth();
  console.log(session);
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

export default api;
