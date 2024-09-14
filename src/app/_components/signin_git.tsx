"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

export default function SigninGit() {
  return (
    <button
      className="flex w-full items-center justify-center rounded-md border border-zinc-300 bg-white py-1 text-zinc-700"
      onClick={() => signIn("github", { callbackUrl: "/" })}
    >
      <FaGithub className="text-black-700 mr-2" />
      Github
    </button>
  );
}
