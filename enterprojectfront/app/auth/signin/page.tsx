import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold">로그인</h1>

        <form className="space-y-3">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="아이디"
            name="userId"
          />
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="비밀번호"
            name="password"
            type="password"
          />
          <button
            type="button"
            className="w-full rounded-xl bg-black px-4 py-3 font-medium text-white"
          >
            로그인
          </button>
        </form>

        <Link
          href="/auth/signup"
          className="block w-full rounded-xl border px-4 py-3 text-center font-medium"
        >
          회원가입
        </Link>

        <Link href="/" className="block text-center text-sm underline text-gray-600">
          홈으로
        </Link>
      </div>
    </main>
  );
}
