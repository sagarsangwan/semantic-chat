"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginPage() {
  return <Button onClick={() => signIn("google")}>sign in</Button>;
}
