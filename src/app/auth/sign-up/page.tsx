import AuthForm from "@/components/auth/AuthForm";
import getUserSession from "../_actions/session";
import { ROUTES } from "@/constants/routes";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getUserSession();

  if (session) {
    redirect(ROUTES.home);
  }
  return <AuthForm mode="signup" />;
}
