import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Link
        href="/auth/signin"
        className="rounded-xl bg-black px-4 py-3 text-white"
      >
        로그인
      </Link>
    </main>
  );
}
