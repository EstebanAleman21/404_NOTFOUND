import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Login from "~/app/_components/login";
import { LoginViewComponent } from "./_components/login-view";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="mx-6 my-2 flex min-h-screen max-w-full flex-col rounded-lg p-20">
        <LoginViewComponent />

        {session && <h1>Logged in as {session.user?.name}</h1>}
        {session && <p>Email: {session.user?.email}</p>}

        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </HydrateClient>
  );
}
