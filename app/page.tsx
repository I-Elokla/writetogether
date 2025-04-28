"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [docTitle, setDocTitle] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const endpoint = isLogin ? "/api/login" : "/api/register";
    const body: any = { email, password };
    if (!isLogin) body.name = name;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    }
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      alert("Please enter a document title.");
      return;
    }
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner: user!.email, title: docTitle }),
    });
    const { code, error } = await res.json();
    if (error) {
      alert(error);
    } else {
      router.push(`/editor?docId=${code}`);
    }
  };

  const handleJoinDoc = () => {
    if (inviteCode.trim()) {
      router.push(`/editor?docId=${inviteCode.trim()}`);
    }
  };

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-6">
          {isLogin ? "Login" : "Register"} to WriteTogether
        </h1>
        <form
          onSubmit={handleAuth}
          className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow"
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Display Name"
              className="border px-4 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isLogin ? "Login" : "Register"}
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-600 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center w-full max-w-xl mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
          className="text-red-600 hover:underline"
        >
          Sign out
        </button>
      </div>

      <form
        onSubmit={handleCreateDoc}
        className="flex gap-2 w-full max-w-xl mb-6"
      >
        <input
          type="text"
          placeholder="New document title"
          value={docTitle}
          onChange={(e) => setDocTitle(e.target.value)}
          className="border px-4 py-2 rounded flex-1"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Create
        </button>
      </form>

      <div className="flex gap-4 mb-6">
        <Link
          href="/my-documents"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          My Documents
        </Link>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter document code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={handleJoinDoc}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Join
        </button>
      </div>
    </main>
  );
}


