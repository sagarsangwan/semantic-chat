import HomeDashboard from "@/components/views/HomeDashboard";
import Welcome from "@/components/welcome-screen/Welcome";
import { auth } from "@/lib/auth";
// import Home from "@/components/Home";
export default async function Page() {
  const session = await auth();
  return <div>{session ? <HomeDashboard /> : <Welcome />}</div>;
}
