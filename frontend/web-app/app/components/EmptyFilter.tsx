"use client";
import React, { useSyncExternalStore } from "react";
import { useParamsStore } from "../hooks/useParamsStore";
import Heading from "./Heading";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

type Props = {
  title?: string;
  subtitle?: string;
  showResetButton?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
};

export default function EmptyFilter({
  title = "No matches for this filter",
  subtitle = "try changin or reset the filter",
  showResetButton,
  showLogin,
  callbackUrl,
}: Props) {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center></Heading>
      <div className="mt-4">
        {showResetButton && (
          <Button outline onClick={() => reset()}>
            Remove filter
          </Button>
        )}
        {showLogin && (
          <Button
            outline
            onClick={() => signIn("id-server", { callbackUrl: callbackUrl })}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
