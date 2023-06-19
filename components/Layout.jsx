"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);

  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="w-full flex justify-center">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="bg-white p-2 px-4 rounded-lg flex gap-1"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-icon="google"
              className="w-5 h-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="red"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-bgGray min-h-screen ">
      <div className=" md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(!showNav)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
