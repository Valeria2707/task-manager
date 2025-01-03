import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import getUserSession from "@/app/auth/_actions/session";
import { ROUTES } from "@/constants/routes";

export default async function Navbar() {
  const session = await getUserSession();

  return (
    <nav className="w-full flex justify-end items-center p-4">
      {session ? (
        <LogoutButton />
      ) : (
        <Link href={ROUTES.login} className="px-4 py-2 btn">
          Login
        </Link>
      )}
    </nav>
  );
}
