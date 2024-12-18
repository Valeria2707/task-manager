import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p> hello</p>
      <Link href={ROUTES.tasks}>Go to tasks table</Link>
    </div>
  );
}
