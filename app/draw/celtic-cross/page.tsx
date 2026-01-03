import type { Metadata } from "next";

import DrawSpreadPage from "@/app/draw/_components/DrawSpreadPage";

export const metadata: Metadata = {
  title: "ケルト十字 | Tarot Journey",
  description:
    "ケルト十字のスプレッドで、状況を多角的に読み解くリーディングを行います。",
};

export default function CelticCrossPage() {
  return <DrawSpreadPage spreadId="celtic-cross" />;
}
