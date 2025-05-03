import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 ">
      <div className="flex w-full max-w-sm flex-col gap-6 items-center border-1 border-red-500 p-4 rounded-md">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          Semantic Chat
        </a>
        <div className="flex flex-col gap-2">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit">Sign in With Google</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
