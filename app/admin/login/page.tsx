"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-display font-semibold">Zamu Stays</span>
          <p className="font-mono-route text-[11px] uppercase text-brass mt-1">
            Admin
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-paper/15 p-8 space-y-5"
        >
          <div>
            <label className="text-sm" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-paper/20 bg-transparent px-4 py-3 text-sm focus-ring"
              required
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-paper/20 bg-transparent px-4 py-3 text-sm focus-ring"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-brass">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brass text-ink font-medium py-3.5 hover:brightness-95 transition disabled:opacity-60 focus-ring"
          >
            <LogIn size={16} />
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
