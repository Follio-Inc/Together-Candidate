import { SignupForm } from "./SignupForm";

export default function SignupPage({
  searchParams
}: {
  searchParams: { next?: string };
}) {
  const next =
    typeof searchParams.next === "string" && searchParams.next.length > 0
      ? searchParams.next
      : undefined;

  return <SignupForm next={next} />;
}

