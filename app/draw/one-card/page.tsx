import type { Metadata } from "next";

import DrawSpreadPage from "@/app/draw/_components/DrawSpreadPage";

export const metadata: Metadata = {
  title: "1枚引き | Tarot Journey",
  description: "1枚引きのスプレッドでタロットを引き、メッセージを受け取ります。",
};

export default function OneCardPage() {
  return <DrawSpreadPage spreadId="one-card" />;
}
