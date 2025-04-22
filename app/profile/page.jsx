"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession({ required: true });
  const [response, setResponse] = useState("{}");

  const getUserDetails = async (useToken) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
        headers: useToken
          ? { Authorization: "Bearer " + session?.access_token }
          : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      setResponse(error.message);
    }
  };

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <div>
          <p>PK: {session.user.pk}</p>
          <p>Username: {session.user.username}</p>
          <p>Email: {session.user.email || "Not provided"}</p>
          <span>{response}</span>
        </div>
        <div className="justify-center mt-4">
          <Button colorScheme="blue" onClick={() => getUserDetails(true)}>
            User details (with token)
          </Button>
          <Button colorScheme="orange" onClick={() => getUserDetails(false)}>
            User details (without token)
          </Button>
          <Button
            colorScheme="red"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return <></>;
}
