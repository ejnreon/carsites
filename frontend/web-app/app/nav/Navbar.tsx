// 'use client'

import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/AuthActions";
import UserActions from "./UserActions";
import { getAuth } from "@/lib/oidcLib";

export default async function Navbar() {
  const user = await getCurrentUser();

  // console.log('client component');
  return (
    <header className="sticky top-0 z-50 justify-between flex bg-white shadow-md p-5 items-center text-gray-800">
      <Logo />
      <Search />
      {user ? <UserActions user={user}></UserActions> : <LoginButton />}
    </header>
  );
}
