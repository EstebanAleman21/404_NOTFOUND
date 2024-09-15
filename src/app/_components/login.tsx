"use client";

import Link from "next/link";
import React, { use } from "react";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const login = () => {
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" }); // Redirect to '/dashboard' after successful login
  };
  return (
    <div>
      <Card className="my-4 shadow-xl">
        <CardHeader>
          <CardTitle className="mb-3 text-3xl">Login</CardTitle>
          <CardDescription>Login to enter dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          
          <CardDescription>LogIn with third party apps</CardDescription>
          <Link href="/api/auth/callback/google" passHref>
            <Button
              variant="outline"
              className="w-full rounded-full mt-5"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="mx-3" /> Login with Google
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default login;


