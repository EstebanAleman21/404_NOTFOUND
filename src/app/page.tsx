import Link from "next/link";
import { LatestPost } from "~/app/_components/post";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { nessieManager } from "~/server/nessieManager";
import { api, HydrateClient } from "~/trpc/server";
import { LoginViewComponent } from "./_components/login-view";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  // Fetch customer data only if the session and nessie_id are available
  let customer = null;
  if (session && session.user?.nessie_id) {
    customer = await nessieManager.getCustomerById(session.user.nessie_id);
  }

  return (
    <HydrateClient>
      <div className="mx-6 my-2 flex min-h-screen max-w-full flex-col rounded-lg p-20">
        <LoginViewComponent />

        {session && <h1>Logged in as {session.user?.name}</h1>}
        {session && <p>Email: {session.user?.email}</p>}
        {session && <p>Nessie: {session.user?.nessie_id}</p>}
        {session && <p>Nessie: {session.user?.account_id}</p>}

        {customer && (
          <div>
            <h2>Customer Data</h2>
            <p>Customer ID: {customer._id}</p>
            <p>
              Customer Name: {customer.first_name} {customer.last_name}
            </p>
            {/* Add more customer details as necessary */}
          </div>
        )}

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
