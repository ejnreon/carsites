"use client";
import { Button, DropdownDivider } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { GET } from "../api/oidc/route";
import { Dropdown } from "flowbite-react";
import { AiFillCar, AiFillTrophy } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi";
import { User } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { useParamsStore } from "../hooks/useParamsStore";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathName !== "/") router.push("/");
  }
  function setSeller() {
    setParams({ winner: undefined, seller: user.username });
    if (pathName !== "/") router.push("/");
  }
  return (
    <Dropdown label={`Welcome ${user.name}`} dismissOnClick={false}>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My auction
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
        Auctions won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/auctions/create">Sell car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (dev only!)</Link>
      </Dropdown.Item>
      <DropdownDivider />
      <Dropdown.Item
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        Wyloguj
      </Dropdown.Item>
      <Dropdown.Item href="/api/auth/oidc">Test</Dropdown.Item>
    </Dropdown>
  );
}
