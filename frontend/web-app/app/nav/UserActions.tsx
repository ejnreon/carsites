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
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  return (
    <Dropdown label={`Welcome ${user.name}`} dismissOnClick={false}>
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My auction</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Auctions won</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/">Sell car</Link>
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
