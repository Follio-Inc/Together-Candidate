import { LoginForm } from "./LoginForm";

export default function LoginPage({
  searchParams
}: {
  searchParams: { next?: string };
}) {
  const next =
    typeof searchParams.next === "string" && searchParams.next.length > 0
      ? searchParams.next
      : undefined;

  return <LoginForm next={next} />;
}

