'use client'
import { trpc } from "~/trpc/client";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Server Message</h1>

      </div>
    </main>
  );
}
