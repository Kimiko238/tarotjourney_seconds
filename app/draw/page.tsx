import type { Metadata } from "next";

import DrawSpreadPage from "@/app/draw/_components/DrawSpreadPage";

export const metadata: Metadata = {
  title: "タロットを引く | Tarot Journey",
  description:
    "タロットカードを1枚引いて、今のあなたへのメッセージを受け取ります。",
};

export default function DrawIndexPage() {
  return <DrawSpreadPage spreadId="one-card" />;
}
