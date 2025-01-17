import logout from "@/app/auth/_actions/logout";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <Button onClick={logout} className="px-4 py-2 btn">
      Logout
    </Button>
  );
}
