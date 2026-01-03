"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Card } from "@/app/lib/cards";
import { getCardImagePath } from "@/app/lib/cards";

type CardSlotProps = {
  card?: Card;
  width: number;
  height: number;
  rotation?: number;
};

function CardSlot({ card, width, height, rotation = 0 }: CardSlotProps) {
  const baseRotation = rotation + (card?.isReversed ? 180 : 0);
  if (!card) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-[10px] text-slate-500 shadow-[0_10px_24px_rgba(0,0,0,0.14)] sm:text-xs"
        style={{ width, height }}
      >
        ここに表示されます
      </div>
    );
  }

  return (
    <div
      className="relative origin-center overflow-hidden border border-slate-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
      style={{ width, height, transform: `rotate(${baseRotation}deg)` }}
    >
      <Image
        src={getCardImagePath(card.id)}
        alt={card.name}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}

type SpreadLayoutProps = {
  cards: Card[];
};

export function OneCardLayout({ cards }: SpreadLayoutProps) {
  const card = cards[0];
  return (
    <div className="flex w-full justify-center">
      <CardSlot card={card} width={260} height={420} />
    </div>
  );
}

export function TwoChoiceLayout({ cards }: SpreadLayoutProps) {
  const CARD_WIDTH = 120;
  const CARD_HEIGHT = 190;
  const CARD_WIDTH_MOBILE = 96;
  const CARD_HEIGHT_MOBILE = 152;
  const CARD_WIDTH_SMALL = 86;
  const CARD_HEIGHT_SMALL = 136;
  const positions = [
    { x: "50%", y: "72%" },
    { x: "34%", y: "52%" },
    { x: "66%", y: "52%" },
    { x: "18%", y: "20%" },
    { x: "81%", y: "20%" },
  ];
  const positionsMobile = [
    { x: "50%", y: "78%" },
    { x: "28%", y: "55%" },
    { x: "72%", y: "55%" },
    { x: "15%", y: "28%" },
    { x: "85%", y: "28%" },
  ];
  const positionsSmall = [
    { x: "50%", y: "85%" },
    { x: "26%", y: "58%" },
    { x: "74%", y: "58%" },
    { x: "14%", y: "30%" },
    { x: "86%", y: "30%" },
  ];
  const [layout, setLayout] = useState<"default" | "mobile" | "small">(
    "default"
  );

  useEffect(() => {
    const small = window.matchMedia("(max-width: 550px)");
    const mobile = window.matchMedia("(max-width: 900px)");
    const update = () => {
      if (small.matches) {
        setLayout("small");
        return;
      }
      if (mobile.matches) {
        setLayout("mobile");
        return;
      }
      setLayout("default");
    };
    update();
    small.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      small.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  const activePositions =
    layout === "small"
      ? positionsSmall
      : layout === "mobile"
      ? positionsMobile
      : positions;
  const activeWidth =
    layout === "small"
      ? CARD_WIDTH_SMALL
      : layout === "mobile"
      ? CARD_WIDTH_MOBILE
      : CARD_WIDTH;
  const activeHeight =
    layout === "small"
      ? CARD_HEIGHT_SMALL
      : layout === "mobile"
      ? CARD_HEIGHT_MOBILE
      : CARD_HEIGHT;

  return (
    <div className="two-choice-layout relative h-[600px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      {activePositions.map((pos, index) => (
        <div
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pos.x, top: pos.y }}
        >
          <CardSlot
            card={cards[index]}
            width={activeWidth}
            height={activeHeight}
          />
        </div>
      ))}
    </div>
  );
}

export function CelticCrossLayout({ cards }: SpreadLayoutProps) {
  const CARD_WIDTH = 120;
  const CARD_HEIGHT = 192;
  const CARD_WIDTH_MOBILE = 96;
  const CARD_HEIGHT_MOBILE = 154;
  const CARD_WIDTH_SMALL = 59;
  const CARD_HEIGHT_SMALL = 95;
  const positions = [
    { x: "37%", y: "50%", rotation: 0, zIndex: 1 },
    { x: "37%", y: "50%", rotation: -90, zIndex: 2 },
    { x: "37%", y: "22%", rotation: 0 },
    { x: "37%", y: "78%", rotation: 0 },
    { x: "16%", y: "50%", rotation: 0 },
    { x: "60%", y: "50%", rotation: 0 },
    { x: "82%", y: "87%", rotation: 0 },
    { x: "82%", y: "62%", rotation: 0 },
    { x: "82%", y: "39%", rotation: 0 },
    { x: "82%", y: "15%", rotation: 0 },
  ];
  const positionsMobile = [
    { x: "40%", y: "50%", rotation: 0, zIndex: 1 },
    { x: "40%", y: "50%", rotation: -90, zIndex: 2 },
    { x: "40%", y: "22%", rotation: 0 },
    { x: "40%", y: "78%", rotation: 0 },
    { x: "18%", y: "50%", rotation: 0 },
    { x: "62%", y: "50%", rotation: 0 },
    { x: "82%", y: "87%", rotation: 0 },
    { x: "82%", y: "62%", rotation: 0 },
    { x: "82%", y: "39%", rotation: 0 },
    { x: "82%", y: "15%", rotation: 0 },
  ];
  const positionsSmall = [
    { x: "42%", y: "52%", rotation: 0, zIndex: 1 },
    { x: "42%", y: "52%", rotation: -90, zIndex: 2 },
    { x: "42%", y: "30%", rotation: 0 },
    { x: "42%", y: "73%", rotation: 0 },
    { x: "16%", y: "52%", rotation: 0 },
    { x: "66%", y: "52%", rotation: 0 },
    { x: "88%", y: "80%", rotation: 0 },
    { x: "88%", y: "60%", rotation: 0 },
    { x: "88%", y: "40%", rotation: 0 },
    { x: "88%", y: "20%", rotation: 0 },
  ];
  const [layout, setLayout] = useState<"default" | "mobile" | "small">(
    "default"
  );

  useEffect(() => {
    const small = window.matchMedia("(max-width: 550px)");
    const mobile = window.matchMedia("(max-width: 900px)");
    const update = () => {
      if (small.matches) {
        setLayout("small");
        return;
      }
      if (mobile.matches) {
        setLayout("mobile");
        return;
      }
      setLayout("default");
    };
    update();
    small.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      small.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  const activePositions =
    layout === "small"
      ? positionsSmall
      : layout === "mobile"
      ? positionsMobile
      : positions;
  const activeWidth =
    layout === "small"
      ? CARD_WIDTH_SMALL
      : layout === "mobile"
      ? CARD_WIDTH_MOBILE
      : CARD_WIDTH;
  const activeHeight =
    layout === "small"
      ? CARD_HEIGHT_SMALL
      : layout === "mobile"
      ? CARD_HEIGHT_MOBILE
      : CARD_HEIGHT;

  return (
    <div className="celtic-cross-layout relative h-[1100px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      {activePositions.map((pos, index) => (
        <div
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pos.x, top: pos.y, zIndex: pos.zIndex }}
        >
          <CardSlot
            card={cards[index]}
            width={activeWidth}
            height={activeHeight}
            rotation={pos.rotation}
          />
        </div>
      ))}
    </div>
  );
}
