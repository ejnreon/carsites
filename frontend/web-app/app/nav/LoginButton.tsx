"use client";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function LoginButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Button
      outline
      isProcessing={isProcessing}
      processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
      onClick={() => {
        setIsProcessing(true);
        signIn("id-server", { callbackUrl: "/" }, { prompt: "login" });
      }}
    >
      Zaloguj
    </Button>
  );
}
