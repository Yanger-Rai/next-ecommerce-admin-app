"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

import Layout from "@/components/Layout";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <div>
          Hello, <b>{session?.user?.name}</b>
        </div>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <Image
            src={session?.user?.image}
            alt="profile image"
            width={40}
            height={40}
          />
          <span className="py-2 px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
