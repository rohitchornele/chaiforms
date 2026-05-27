import { redirect } from "next/navigation";
import { env } from "~/env";

export default function ApiDocsPage() {
const BASE_URL = env.NEXT_PUBLIC_API_URL
  redirect(
    `${BASE_URL}/docs`,
  );
}