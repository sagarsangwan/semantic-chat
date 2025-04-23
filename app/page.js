import LoginPage from "@/components/Home";
import { auth } from "@/lib/auth";
// import Home from "@/components/Home";
export default async function Page() {
  const session = await auth();
  console.log("sessionssssssssssssssssssssssssss", session);
  return (
    <div>
      <LoginPage />
    </div>
  );
}
