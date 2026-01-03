"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import type { Card } from "@/app/lib/cards";
import { drawMany } from "@/app/lib/cards";
import { formatCardResult, getSpreadById } from "@/app/draw/_data/spreads";
import {
  CelticCrossLayout,
  OneCardLayout,
  TwoChoiceLayout,
} from "@/app/draw/_components/spread-layouts";

const floatingCards = Array.from({ length: 10 }, (_, i) => i);
const SETTLE_DURATION = 1400;
const DRAW_DELAY = 500;
const celticCrossPositions = [
  {
    title: "現在の状況",
    description: "質問者が今どのような状況に置かれているか",
  },
  {
    title: "障害と対策（キーカード）",
    description: "現状に対して対立するもの、乗り越えていくもの",
  },
  {
    title: "顕在している事柄・意識（可能性）",
    description: "表に見えることで、これから問題に対してどうなるか",
  },
  {
    title: "潜在している事柄・意識",
    description: "表には見えていない、現状に対して問題の根っこにあること",
  },
  {
    title: "近い過去",
    description: "現状に対して影響を及ぼした過去",
  },
  {
    title: "近い未来",
    description: "現状から近い未来で起こる可能性",
  },
  {
    title: "質問者の立場や状況",
    description: "質問者が占う内容や問題に対してどんな関わり方をしているか",
  },
  {
    title: "質問者以外の人",
    description: "質問者以外の人物の心理や状況",
  },
  {
    title: "質問者の願望",
    description: "理想や恐れなど質問者の問題に対しての態度",
  },
  {
    title: "最終結果",
    description: "質問に対する最終的な結果（他の9枚と合わせて読む）",
  },
];

const twoChoicePositions = [
  {
    title: "質問者の現状",
    description: "質問者が今どのような状況に置かれているか",
  },
  {
    title: "Aの現状",
    description: "選択肢Aを選んだ場合の現状",
  },
  {
    title: "Bの現状",
    description: "選択肢Bを選んだ場合の現状",
  },
  {
    title: "Aの未来",
    description: "選択肢Aを選んだ場合の未来",
  },
  {
    title: "Bの未来",
    description: "選択肢Bを選んだ場合の未来",
  },
];

type DrawSpreadPageProps = {
  spreadId: string;
};

export default function DrawSpreadPage({ spreadId }: DrawSpreadPageProps) {
  const spread = getSpreadById(spreadId);
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [history, setHistory] = useState<Card[][]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [copied, setCopied] = useState(false);
  const [worryText, setWorryText] = useState("");
  const [choiceAText, setChoiceAText] = useState("");
  const [choiceBText, setChoiceBText] = useState("");
  const [shouldShuffle, setShouldShuffle] = useState(true);
  const [isSettling, setIsSettling] = useState(false);
  const [isCompactShuffle, setIsCompactShuffle] = useState(false);
  const [stopAngles, setStopAngles] = useState<string[]>(() =>
    floatingCards.map(() => "0deg")
  );
  const [hasDrawn, setHasDrawn] = useState(false);
  const mountTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsCompactShuffle(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const floatingCardStyles = useMemo(() => {
    const radiusMultiplier = isCompactShuffle ? 0.6 : 1;
    const liftMultiplier = isCompactShuffle ? 0.6 : 1;
    return floatingCards.map((_, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      const radius = (60 + (idx % 5) * 18) * radiusMultiplier;
      const orbitDuration = 1.8 * (0.7 + (idx % 4) * 0.1);
      const tiltDuration = 0.65 * (0.7 + (idx % 3) * 0.08);
      const delay = idx * 0.08;
      const scale = 0.88 + (idx % 4) * 0.03;
      const lift = ((idx % 3) * 6 - 6) * liftMultiplier;
      const tiltBase = (idx % 7) * 2 - 6; // base angle offset per card
      const pileX = (idx % 4) * 6 - 9; // small horizontal fan-out
      const pileY = Math.floor(idx / 4) * -5; // slight upward stacking
      const pileRot = -6 + idx * 1.2;
      const pileScale = 0.92 + (idx % 3) * 0.02;
      return {
        dir,
        radius,
        orbitDuration,
        tiltDuration,
        delay,
        scale,
        lift,
        zIndex: 5 + idx,
        tiltBase,
        pileX,
        pileY,
        pileRot,
        pileScale,
      };
    });
  }, [isCompactShuffle]);

  const buildFortunePrompt = () => {
    if (!spread) return;
    const concern =
      spread.id === "two-choice"
        ? `悩み：${
            worryText.trim() || "（悩みを入力してください）"
          }\n選択肢A：${
            choiceAText.trim() || "（選択肢Aを入力してください）"
          }\n選択肢B：${choiceBText.trim() || "（選択肢Bを入力してください）"}`
        : worryText.trim() || "（悩みを入力してください）";
    const cardResults = currentCards.length
      ? spread.id === "celtic-cross"
        ? celticCrossPositions
            .map((position, index) => {
              const card = currentCards[index];
              const cardLabel = card
                ? formatCardResult(card)
                : "カード結果がまだありません";
              return `${index + 1}. ${position.title}: ${
                position.description
              }\n引いたカード：${cardLabel}`;
            })
            .join("\n\n")
        : spread.id === "two-choice"
        ? twoChoicePositions
            .map((position, index) => {
              const card = currentCards[index];
              const cardLabel = card
                ? formatCardResult(card)
                : "カード結果がまだありません";
              return `${index + 1}. ${position.title}: ${
                position.description
              }\n引いたカード：${cardLabel}`;
            })
            .join("\n\n")
        : currentCards.map(formatCardResult).join("、")
      : "カード結果がまだありません";
    const prompt = spread.buildPrompt({ concern, cardResults });
    setPromptText(prompt);
  };

  const handleDraw = () => {
    if (!spread || isShuffling || isSettling || hasDrawn) return;
    setHasDrawn(true);
    const cards = drawMany(spread.cardCount);
    setCurrentCards([]);
    setIsShuffling(true);
    setShouldShuffle(true);
    setTimeout(() => {
      const now = performance.now();
      setStopAngles(
        floatingCardStyles.map((style) => {
          const elapsed = Math.max(
            0,
            now - mountTimeRef.current - style.delay * 1000
          );
          const cycleMs = style.orbitDuration * 1000;
          if (!cycleMs) return "0deg";
          const progress = (elapsed % cycleMs) / cycleMs;
          const angle = progress * 360 * style.dir;
          return `${angle.toFixed(2)}deg`;
        })
      );
      setIsShuffling(false);
      setIsSettling(true);
      setShouldShuffle(false);
      setTimeout(() => {
        if (cards.length) {
          setCurrentCards(cards);
          setHistory((prev) => [cards, ...prev].slice(0, 5));
        }
        setIsSettling(false);
      }, SETTLE_DURATION);
    }, DRAW_DELAY);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      setCopied(false);
    }
  };

  if (!spread) {
    return (
      <main className="relative min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-lg font-semibold">
            指定されたスプレッドが見つかりませんでした。
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition active:translate-y-0.5 active:scale-[0.98] active:bg-white/60 active:shadow-inner"
          >
            ← スプレッド一覧に戻る
          </Link>
        </div>
      </main>
    );
  }

  const Layout =
    spread.layout === "celtic-cross"
      ? CelticCrossLayout
      : spread.layout === "two-choice"
      ? TwoChoiceLayout
      : OneCardLayout;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-200 via-indigo-100 to-sky-200 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_35%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white/80 px-4 py-8 text-sm font-semibold text-slate-800 shadow-md shadow-indigo-100 transition hover:-translate-y-0.5 hover:shadow-indigo-200 active:translate-y-0.5 active:scale-[0.98] active:bg-white/60 active:shadow-inner lg:py-2"
        >
          ← スプレッド一覧に戻る
        </Link>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-r bg-white p-4 shadow-lg shadow-indigo-100 ring-1 ring-indigo-100">
            <div className="relative flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[18px] font-semibold uppercase tracking-[0.24em] text-indigo-700">
                  step 1
                </span>
                <p className="text-xs uppercase tracking-[0.25em] text-indigo-700">
                  Enter your concern
                </p>
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                カードに聞きたい事を書きましょう
              </h2>
              <div className="relative mt-3 flex flex-col gap-4">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-1 left-2 w-1 rounded-full bg-gradient-to-b from-indigo-400/70 via-violet-300/40 to-transparent" />
                  <textarea
                    value={worryText}
                    onChange={(e) => setWorryText(e.target.value)}
                    placeholder={
                      spread.id === "two-choice"
                        ? "例: どちらに進むべきか迷っています"
                        : "例: 人間関係で悩んでいます"
                    }
                    className={`w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 pl-6 text-sm text-slate-900 shadow-lg shadow-indigo-100 outline-none transition placeholder:text-slate-400 focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/30 ${
                      spread.id === "two-choice"
                        ? "min-h-[350px]"
                        : "min-h-[500px]"
                    }`}
                  />
                </div>
                {spread.id === "two-choice" ? (
                  <div className="grid gap-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                        選択肢A
                      </label>
                      <input
                        value={choiceAText}
                        onChange={(e) => setChoiceAText(e.target.value)}
                        placeholder="例: 転職する"
                        className="mt-2 w-full h-20 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-lg shadow-indigo-100 outline-none transition placeholder:text-slate-400 focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                        選択肢B
                      </label>
                      <input
                        value={choiceBText}
                        onChange={(e) => setChoiceBText(e.target.value)}
                        placeholder="例: 今の職場に残る"
                        className="mt-2 w-full h-20 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-lg shadow-indigo-100 outline-none transition placeholder:text-slate-400 focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/30"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-indigo-100">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[18px] font-semibold uppercase tracking-[0.24em] text-indigo-700">
                    step 2
                  </span>
                  <p className="text-xs uppercase tracking-[0.25em] text-indigo-700">
                    Shuffle preview
                  </p>
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  カードを引きましょう
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  ボタンを押すとアニメが止まり、カードが選ばれます。
                </p>
              </div>
              <button
                onClick={handleDraw}
                disabled={isShuffling || isSettling || hasDrawn}
                className="rounded-full border border-emerald-300/60 bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-emerald-500/50 disabled:translate-y-0 disabled:border-emerald-500 disabled:bg-emerald-600 disabled:text-emerald-50 disabled:shadow-none disabled:brightness-95"
              >
                カードを引く
              </button>
            </div>

            <div className="relative mt-2 md:h-[600px] h-[500px] overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-indigo-100">
              <div className="absolute inset-0">
                {floatingCards.map((_, index) => {
                  const cardStyle = floatingCardStyles[index];
                  return (
                    <div
                      key={index}
                      className="absolute inset-0 flex items-center justify-center"
                      style={
                        {
                          zIndex: cardStyle.zIndex,
                          animation: shouldShuffle
                            ? `swirl ${cardStyle.orbitDuration}s linear ${cardStyle.delay}s infinite`
                            : isSettling
                            ? `swirlStop 1.4s ease-out forwards`
                            : undefined,
                          transform:
                            !shouldShuffle && !isSettling
                              ? `translate3d(${cardStyle.pileX}px, ${cardStyle.pileY}px, 0) rotate(${cardStyle.pileRot}deg) scale(${cardStyle.pileScale})`
                              : undefined,
                          filter:
                            !shouldShuffle && !isSettling
                              ? "brightness(0.9)"
                              : undefined,
                          transition:
                            !shouldShuffle && !isSettling
                              ? "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), filter 1.1s ease"
                              : undefined,
                          "--radius": `${cardStyle.radius}px`,
                          "--start-angle": stopAngles[index] ?? "0deg",
                          "--direction": cardStyle.dir,
                          "--lift": `${cardStyle.lift}px`,
                          "--scale": cardStyle.scale,
                          "--pile-x": `${cardStyle.pileX}px`,
                          "--pile-y": `${cardStyle.pileY}px`,
                          "--pile-rot": `${cardStyle.pileRot}deg`,
                          "--pile-scale": cardStyle.pileScale,
                        } as CSSProperties
                      }
                    >
                      <div className="relative h-[170px] w-[106px] sm:h-[240px] sm:w-[150px] md:h-[256px] md:w-[160px] lg:h-[268px] lg:w-[168px] xl:h-[288px] xl:w-[180px]">
                        <Image
                          src="/back_side.png"
                          alt="card back"
                          fill
                          sizes="(min-width: 1280px) 180px, (min-width: 1024px) 168px, (min-width: 768px) 160px, (min-width: 640px) 150px, 120px"
                          priority
                          className="rounded-[14px] border border-slate-200 bg-white drop-shadow-[0_8px_5px_rgba(0,0,0,0.14)]"
                          style={
                            {
                              animation: shouldShuffle
                                ? `tilt ${cardStyle.tiltDuration}s ease-in-out ${cardStyle.delay}s infinite`
                                : isSettling
                                ? `tilt ${
                                    cardStyle.tiltDuration * 1.6
                                  }s ease-in-out ${cardStyle.delay}s forwards`
                                : undefined,
                              "--tilt-base": `${cardStyle.tiltBase}deg`,
                              transition:
                                "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/60" />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-indigo-100">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[18px] font-semibold uppercase tracking-[0.24em] text-indigo-700">
              result
            </span>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              引いたカード
            </h2>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <Layout cards={currentCards} />
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-inner shadow-indigo-100">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                result
              </p>
              {currentCards.length ? (
                <>
                  <ul className="space-y-1 text-sm font-semibold sm:text-lg">
                    {currentCards.map((card, index) => {
                      const title =
                        spread.id === "celtic-cross"
                          ? celticCrossPositions[index]?.title ??
                            `カード${index + 1}`
                          : spread.id === "two-choice"
                          ? twoChoicePositions[index]?.title ??
                            `カード${index + 1}`
                          : `${index + 1}枚目`;
                      return (
                        <li key={`${card.id}-${index}`}>
                          {title}：{formatCardResult(card)}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p className="text-slate-600">
                  「カードを引く」を押すと結果がここに表示されます。
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-indigo-100">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[18px] font-semibold uppercase tracking-[0.24em] text-indigo-700">
              step 3
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-700">
              Generate prompt
            </p>
          </div>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            プロンプトを作ってコピー、aiツールに貼り付けましょう。
          </h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-[2fr,1fr]">
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-inner shadow-indigo-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-700">
                    Prompt maker
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    カードを引いたら、下のボタンを押してプロンプトを作りましょう。
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyPrompt}
                    disabled={!promptText.trim()}
                  className="shrink-0 whitespace-nowrap rounded-full border border-emerald-300/50 bg-emerald-400/80 px-5 py-5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300 active:translate-y-0.5 active:scale-[0.98] active:bg-emerald-500 active:shadow-inner disabled:cursor-not-allowed disabled:bg-emerald-700 disabled:text-emerald-100 disabled:shadow-none lg:px-3 lg:py-1"
                  >
                    {copied ? "コピー済み" : "コピー"}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={buildFortunePrompt}
                  className="w-full rounded-lg border border-emerald-200 bg-emerald-400 px-3 py-5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300 active:translate-y-0.5 active:scale-[0.98] active:bg-emerald-500 active:shadow-inner lg:py-2"
                >
                  悩み + カード結果で占い師プロンプトを作る
                </button>
              </div>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="min-h-[170px] w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-300/20"
                placeholder="まだプロンプトは作られていません。"
              />
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes tilt {
          0% {
            transform: rotate(calc(var(--tilt-base, 0deg) - 6deg));
          }
          50% {
            transform: rotate(calc(var(--tilt-base, 0deg) + 6deg));
          }
          100% {
            transform: rotate(calc(var(--tilt-base, 0deg) - 6deg));
          }
        }
        @keyframes swirl {
          0% {
            transform: rotate(calc(var(--direction) * 0deg))
              translate3d(var(--radius), var(--lift), 0)
              rotate(calc(var(--direction) * -0deg)) scale(var(--scale));
          }
          50% {
            transform: rotate(calc(var(--direction) * 180deg))
              translate3d(var(--radius), var(--lift), 0)
              rotate(calc(var(--direction) * -180deg)) scale(var(--scale));
          }
          100% {
            transform: rotate(calc(var(--direction) * 360deg))
              translate3d(var(--radius), var(--lift), 0)
              rotate(calc(var(--direction) * -360deg)) scale(var(--scale));
          }
        }
        @keyframes swirlStop {
          0% {
            transform: rotate(var(--start-angle, 0deg))
              translate3d(var(--radius), var(--lift), 0)
              rotate(calc(-1 * var(--start-angle, 0deg))) scale(var(--scale));
          }
          50% {
            transform: rotate(
                calc(var(--start-angle, 0deg) + (var(--direction) * 180deg))
              )
              translate3d(calc(var(--radius) * 0.35), 0, 0)
              rotate(
                calc(
                  -1 * (var(--start-angle, 0deg) + (var(--direction) * 180deg))
                )
              )
              scale(calc(var(--scale) * 0.98));
          }
          100% {
            transform: translate3d(var(--pile-x), var(--pile-y), 0)
              rotate(var(--pile-rot)) scale(var(--pile-scale));
          }
        }
      `}</style>
    </main>
  );
}
