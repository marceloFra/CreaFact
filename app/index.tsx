import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { session, loading } = useAuth();
  if (loading) return null; // usa el splash

  // ✅ grupos () NO van en la URL
  return <Redirect href={session ? "/" : "/auth/login"} />;
}
