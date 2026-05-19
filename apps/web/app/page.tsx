'use client'
import { trpc } from "~/trpc/client";
// import { api } from "~/trpc/server";

export default function Home() {
  // const { status } = await api.health.getHealth.query();
  const {data} = trpc.chaicode.useQuery({email : "rohit@gmail.com"})
  // const {data} = trpc.chaicode.useQuery({email : "rohit@gmail.com"})
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Server Message : {data?.message}</h1>

      </div>
    </main>
  );
}
