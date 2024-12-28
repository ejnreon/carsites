import { auth } from "@/auth";
import React from "react";
import Heading from "../components/Heading";
// import { getAuth } from "@/lib/oidcLib";
import AuthTest from "./AuthTest";

export default async function session() {
  const session = await auth();
  // const oidcSession = await getAuth();
  return (
    <div>
      <Heading title="Session dashboard" subtitle=""></Heading>
      <div className="bg-blue-200 border-2 border-blue-500 whitespace-pre-wrap break-all">
        <h3 className="text-lx">Session data</h3>
        <pre className="whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div className="mg-4 whitespace-pre-wrap break-all">
        {/* {JSON.stringify(oidcSession, null, 2)} */}
      </div>

      <div className="mg-4">
        <AuthTest></AuthTest>
      </div>
    </div>
  );
}
