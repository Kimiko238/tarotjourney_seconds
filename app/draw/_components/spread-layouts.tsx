"use client";

import Image from "next/image";

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
        className="flex items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-xs text-slate-500 shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
        style={{ width, height }}
      >
        ここに表示されます
      </div>
    );
  }

  return (
    <Image
      src={getCardImagePath(card.id)}
      alt={card.name}
      width={width}
      height={height}
      className="rounded-xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
      style={{ transform: `rotate(${baseRotation}deg)` }}
      priority
    />
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
  const positions = [
    { x: "50%", y: "72%" },
    { x: "34%", y: "52%" },
    { x: "66%", y: "52%" },
    { x: "18%", y: "20%" },
    { x: "81%", y: "20%" },
  ];

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pos.x, top: pos.y }}
        >
          <CardSlot
            card={cards[index]}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
          />
        </div>
      ))}
    </div>
  );
}

export function CelticCrossLayout({ cards }: SpreadLayoutProps) {
  const CARD_WIDTH = 140;
  const CARD_HEIGHT = 140;
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

  return (
    <div className="relative h-[1100px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pos.x, top: pos.y, zIndex: pos.zIndex }}
        >
          <CardSlot
            card={cards[index]}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            rotation={pos.rotation}
          />
        </div>
      ))}
    </div>
  );
}
