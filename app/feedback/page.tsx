"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";

type FeedbackFormState = {
  purpose: string;
  details: string;
  name: string;
  contact: string;
};

export default function FeedbackPage() {
  const [form, setForm] = useState<FeedbackFormState>({
    purpose: "",
    details: "",
    name: "",
    contact: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange =
    (field: keyof FeedbackFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "送信に失敗しました。");
      }

      setStatus("success");
      setStatusMessage("送信しました。ご協力ありがとうございます！");
      setForm({ purpose: "", details: "", name: "", contact: "" });
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "送信に失敗しました。時間をおいて再試行してください。",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#fad74d] via-[#ffe083] to-[#fff4c4] px-6 py-12 text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Link
          href="/"
          className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-md shadow-stone-400 transition hover:-translate-y-0.5"
        >
          ← 前のページへ戻る
        </Link>
        <header className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md shadow-stone-400 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">
            お気軽にお書きください
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            ご意見・ご要望・バグ報告
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            用途を選んで、内容を送ってください。任意項目は空欄でも送信できます。
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-md  shadow-stone-400 backdrop-blur"
        >
          <div className="grid gap-4">
            <label className="space-y-2 text-sm font-semibold text-slate-800">
              目的
              <select
                name="purpose"
                required
                value={form.purpose}
                onChange={handleChange("purpose")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm shadow-indigo-100 outline-none transition focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/30"
              >
                <option value="" disabled>
                  選択してください
                </option>
                <option value="要望">要望</option>
                <option value="フィードバック">フィードバック</option>
                <option value="バグ報告">バグ報告</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-semibold text-slate-800">
              詳細
              <textarea
                name="details"
                required
                value={form.details}
                onChange={handleChange("details")}
                className="min-h-[180px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-indigo-100 outline-none transition focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/30"
                placeholder="状況や内容を具体的に書いてください"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-slate-800">
                お名前（任意）
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-indigo-100 outline-none transition focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/30"
                  placeholder="ハンドルネームでもOK"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-800">
                連絡先（任意）
                <input
                  name="contact"
                  type="text"
                  value={form.contact}
                  onChange={handleChange("contact")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-indigo-100 outline-none transition focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/30"
                  placeholder="メールアドレスなど"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-600" aria-live="polite">
              {status === "success" || status === "error"
                ? statusMessage
                : "書けましたら送信ボタンを押してください。。"}
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSending}
            >
              {isSending ? "送信中..." : "送信する"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
