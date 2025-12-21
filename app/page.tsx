"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Spread = {
  id: string;
  name: string;
  cards: number;
  subtitle: string;
  description: string;
  tags: string[];
  estTime: string;
  accent: string;
};

const spreads: Spread[] = [
  {
    id: "one-card",
    name: "1枚引き",
    cards: 1,
    subtitle: "直感で1枚だけ選ぶシンプルなリーディング",
    description: "今日のテーマや迷いがある時にさっと答えをもらえる基本の引き方です。",
    tags: ["スピーディ", "初心者向け", "日常使い"],
    estTime: "1分",
    accent: "from-indigo-500/20 via-indigo-400/10 to-sky-300/20",
  },
  {
    id: "celtic-cross",
    name: "ケルト十字",
    cards: 10,
    subtitle: "伝統的な10枚展開で状況を多角的に読む",
    description: "現状・障害・無意識・未来など複数の視点から深く掘り下げる代表的なスプレッド。",
    tags: ["深堀り", "全体像", "課題整理"],
    estTime: "8〜12分",
    accent: "from-violet-500/20 via-indigo-400/10 to-sky-400/15",
  },
  {
    id: "ppf",
    name: "過去・現在・未来",
    cards: 3,
    subtitle: "流れを3枚で確認する定番スプレッド",
    description: "これまでの背景・今の状況・これからの流れを短時間でつかみたい時におすすめ。",
    tags: ["流れ", "シンプル", "短時間"],
    estTime: "3〜5分",
    accent: "from-sky-500/20 via-indigo-400/10 to-indigo-300/20",
  },
  {
    id: "decision",
    name: "二者択一",
    cards: 4,
    subtitle: "2つの選択肢を並べて比較する",
    description: "それぞれのメリット・デメリットや、最終的な助言をもらいたい時に。",
    tags: ["選択", "比較", "意思決定"],
    estTime: "4〜6分",
    accent: "from-blue-500/18 via-indigo-400/10 to-violet-400/18",
  },
  {
    id: "relationship",
    name: "相性・関係性",
    cards: 5,
    subtitle: "お互いの立場と関係の今後を占う",
    description: "自分と相手の気持ち、障害、今後の流れを確認したい時に使うスプレッドです。",
    tags: ["恋愛/対人", "バランス", "状況整理"],
    estTime: "5〜8分",
    accent: "from-indigo-500/22 via-sky-400/12 to-cyan-300/18",
  },
  {
    id: "work",
    name: "仕事の課題整理",
    cards: 6,
    subtitle: "現状・課題・行動・結果を確認する",
    description: "プロジェクトやキャリアの停滞感を整理し、次の一手を見つけるための並べ方。",
    tags: ["キャリア", "改善策", "次の一歩"],
    estTime: "6〜9分",
    accent: "from-indigo-600/18 via-indigo-400/10 to-sky-400/16",
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>(spreads[0]?.id ?? "");
  const selectedSpread = useMemo(() => spreads.find((s) => s.id === selectedId), [selectedId]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-200 via-indigo-100 to-sky-200 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_35%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700 ring-1 ring-indigo-100 backdrop-blur">
            カードの引き方を選ぶ
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {spreads.map((spread) => {
            const isActive = spread.id === selectedId;
            return (
              <article
                key={spread.id}
                className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-indigo-100 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-200/70 ${
                  isActive ? "ring-2 ring-indigo-300/80" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-80 blur-3xl transition duration-500 group-hover:opacity-100 group-hover:blur-2xl bg-gradient-to-br ${spread.accent}`}
                />
                <div className="relative flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-700">Spread</p>
                      <h2 className="text-xl font-semibold text-slate-900">{spread.name}</h2>
                    </div>
                    <div className="flex flex-col items-end text-right text-xs text-slate-600">
                      <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold text-indigo-800">
                        {spread.cards}枚
                      </span>
                      <span className="mt-1 text-slate-500">所要 {spread.estTime}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{spread.subtitle}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{spread.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {spread.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-[11px] font-semibold text-indigo-700 shadow-sm shadow-indigo-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {spread.id === "one-card" ? (
                        <Link
                        href="/draw/one-card"
                        className="mt-2 inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm shadow-indigo-100 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-indigo-200"
                        >
                      1枚引きページへ進む →
                    </Link>
                  ) : spread.id === "celtic-cross" ? (
                    <Link
                      href="/draw/celtic-cross"
                      className="mt-2 inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm shadow-indigo-100 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-indigo-200"
                    >
                      ケルト十字ページへ進む →
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-indigo-100 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">Tips</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-indigo-100/80 bg-indigo-50/70 p-4 text-sm text-indigo-900 shadow-inner shadow-indigo-100">
              <p className="font-semibold">迷ったら1枚引きから</p>
              <p className="text-slate-700">悩みが漠然としている時は1枚でテーマを掴み、必要に応じて他のスプレッドに進むのがおすすめです。</p>
            </div>
            <div className="rounded-2xl border border-indigo-100/80 bg-indigo-50/70 p-4 text-sm text-indigo-900 shadow-inner shadow-indigo-100">
              <p className="font-semibold">深掘りしたい時はケルト十字</p>
              <p className="text-slate-700">複雑な状況や長期的なテーマでは、10枚展開で視点を増やすとヒントが見えやすくなります。</p>
            </div>
            <div className="rounded-2xl border border-indigo-100/80 bg-indigo-50/70 p-4 text-sm text-indigo-900 shadow-inner shadow-indigo-100">
              <p className="font-semibold">所要時間を目安に選ぶ</p>
              <p className="text-slate-700">短時間で終えたいなら3枚以内、じっくり取り組むなら5枚以上のスプレッドを選びましょう。</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
