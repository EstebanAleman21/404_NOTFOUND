import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      // Add your custom fields here
      nessie_id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    // Add your custom fields here
    nessie_id?: string;
    account_id?: string;
  }
}
