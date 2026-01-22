import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold">회원가입</h1>

        <form className="space-y-3">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="아이디"
            name="userId"
          />
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="이름(선택)"
            name="userName"
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
            가입하기
          </button>
        </form>

        <Link href="/auth/signin" className="block text-center text-sm underline">
          이미 계정이 있어요 → 로그인
        </Link>
      </div>
    </main>
  );
}
