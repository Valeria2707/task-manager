"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import signUp from "@/app/auth/api/sign-up";
import login from "@/app/auth/api/login";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isLoginMode = mode === "login";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    const action = isLoginMode ? login : signUp;

    const result = await action(formData);

    if (result.error) {
      setErrorMessage(
        result.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded-lg max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {isLoginMode ? "Login" : "Sign Up"}
      </h2>

      {errorMessage && (
        <div className="mb-4 text-red-600 text-sm text-center">
          {errorMessage}
        </div>
      )}

      <div className="mb-4">
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-4">
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <Button
        type="submit"
        className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        {isLoginMode ? "Login" : "Sign Up"}
      </Button>

      <p className="text-sm text-gray-600 mt-4 text-center">
        {isLoginMode ? (
          <>
            Don’t have an account?{" "}
            <Link
              href={ROUTES.signUp}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href={ROUTES.login} className="text-blue-500 hover:underline">
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
