import AuthForm from "@/components/auth/AuthForm";
import getUserSession from "../_actions/session";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default async function Login() {
  const session = await getUserSession();

  if (session) {
    redirect(ROUTES.home);
  }
  return <AuthForm mode="login" />;
}
