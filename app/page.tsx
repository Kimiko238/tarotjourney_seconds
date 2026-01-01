"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import GoldenBackground from "./_components/GoldenBackground";

type Spread = {
  id: string;
  name: string;
  cards: number;
  subtitle: string;
  description: string;
  accent: string;
};

const spreads: Spread[] = [
  {
    id: "one-card",
    name: "1枚引き",
    cards: 1,
    subtitle: "直感で1枚だけ選ぶシンプルなリーディング",
    description:
      "今すぐの行動や判断を知りたい時。\n迷いが強く、答えをシンプルに出したい時。",
    accent: "from-indigo-500/20 via-indigo-400/10 to-sky-300/20",
  },
  {
    id: "celtic-cross",
    name: "ケルト十字",
    cards: 10,
    subtitle: "伝統的な10枚展開で状況を多角的に読む",
    description:
      "状況を整理したい時。\n仕事や人生など、中長期のテーマを落ち着いて見たい場合。",
    accent: "from-violet-500/20 via-indigo-400/10 to-sky-400/15",
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>(spreads[0]?.id ?? "");
  const selectedSpread = useMemo(
    () => spreads.find((s) => s.id === selectedId),
    [selectedId]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1a38] via-[#3891bc] to-[#8ba4d0] text-slate-900">
      <GoldenBackground />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-base font-semibold font-mincho tracking-[0.22em] text-[#d4af37] backdrop-blur">
            TarotJourney{" "}
            <Image
              src="/logo/logo.png"
              alt="Tarot Journey logo"
              width={180}
              height={48}
              className="h-auto w-10"
              priority
            />
          </div>
        </header>
        <p className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)] leading-relaxed">
          ようこそ！ここは、無料でタロット占いを体験できる場所です。。
          <br />タロットを学んでいる方も、占いを受けたい方も、お気軽にご利用ください。
        </p>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {spreads.map((spread) => {
            const isActive = spread.id === selectedId;
            return (
              <article
                key={spread.id}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-indigo-100 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-200/70 ${
                  isActive ? "ring-2 ring-indigo-300/80" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-80 blur-3xl transition duration-500 group-hover:opacity-100 group-hover:blur-2xl bg-gradient-to-br ${spread.accent}`}
                />
                <div className="relative flex flex-1 flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-700">
                        Spread
                      </p>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {spread.name}
                      </h2>
                    </div>
                    <div className="flex flex-col items-end text-right text-xs text-slate-600">
                      <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold text-indigo-800">
                        カード枚数:{spread.cards}枚
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {spread.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    【こんな時におすすめ】
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {spread.description}
                  </p>
                  {spread.id === "one-card" ? (
                    <Link
                      href="/draw/one-card"
                      className="mt-auto inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm shadow-indigo-100 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-indigo-200"
                    >
                      1枚引きで引く →
                    </Link>
                  ) : spread.id === "celtic-cross" ? (
                    <Link
                      href="/draw/celtic-cross"
                      className="mt-auto inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm shadow-indigo-100 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-indigo-200"
                    >
                      ケルト十字で引く →
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-indigo-100 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">
            このサイトの使い方
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-indigo-100/80 bg-indigo-50/70 p-4 text-sm text-indigo-900 shadow-inner shadow-indigo-100">
              <p className="font-semibold">①どのスプレッドで占うか選択する。</p>
              <p className="text-slate-700">
                今後、もっと多くのスプレッドを増やそうと思ってます！良ければ下記でご意見や要望、バグ報告など伺ってます
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-100/80 bg-indigo-50/70 p-4 text-sm text-indigo-900 shadow-inner shadow-indigo-100">
              <p className="font-semibold">
                ②カードに聞きたい事を書いてからカードを引いてください
              </p>
              <p className="text-slate-700">
                悩みや聞きたい事を書いてから「カードを引く」ボタンを押しましょう。※聞きたい事を書かなくてもカードは引けます。
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-100/80 bg-indigo-50/70 p-4 text-sm text-indigo-900 shadow-inner shadow-indigo-100">
              <p className="font-semibold">③AIに鑑定してもらおう</p>
              <p className="text-slate-700">
                入力した情報を元にプロントを作成します。その文章をコピーしてAIに聞いてみる事もできます。自分のリーディングが合っているか不安な時はAIに聞いて思考の幅を広げましょう。
              </p>
            </div>
          </div>
        </section>
        <Link
          href="/feedback"
          className="mt-auto inline-flex items-center justify-center rounded-full border border-indigo-200  px-4 py-2 text-sm font-semibold text-zinc-200 shadow-sm shadow-indigo-100 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-white hover:shadow-indigo-200"
        >
          ご意見やバグ報告はこちらから
        </Link>
      </div>
    </main>
  );
}
