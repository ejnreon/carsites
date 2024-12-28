import EmptyFilter from "@/app/components/EmptyFilter";
import React from "react";

export async function signIn({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <EmptyFilter
      title="You need to login to do that"
      subtitle="Please login"
      showLogin={true}
      callbackUrl={searchParams.callbackUrl}
    ></EmptyFilter>
  );
}
