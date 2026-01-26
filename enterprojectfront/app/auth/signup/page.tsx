"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const id = userId.trim();
    const name = userName.trim(); // 선택값
    const pw = password;

    if (!id) return setMsg("아이디를 입력하세요.");
    if (!pw) return setMsg("비밀번호를 입력하세요.");

    try {
      setLoading(true);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

      const res = await fetch(`${baseUrl}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: id,
          userName: name, // 빈 문자열이면 서버에서 null 처리해도 됨
          password: pw,
        }),
        // 쿠키 인증 쓰면 아래 주석 해제
        // credentials: "include",
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!res.ok) {
        throw new Error(typeof data === "string" ? data : JSON.stringify(data));
      }

      console.log("회원가입 성공:", data);
      setMsg("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push("/auth/signin");
    } catch (err: any) {
      console.error(err);
      setMsg(err?.message ?? "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold">회원가입</h1>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="이름(선택)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black px-4 py-3 font-medium text-white disabled:opacity-50"
          >
            {loading ? "가입 중..." : "가입하기"}
          </button>
        </form>

        {msg && <p className="text-sm text-gray-700">{msg}</p>}
      </div>
    </main>
  );
}
