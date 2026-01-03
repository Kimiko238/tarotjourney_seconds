import type { Metadata } from "next";

import DrawSpreadPage from "@/app/draw/_components/DrawSpreadPage";

export const metadata: Metadata = {
  title: "二者択一 | Tarot Journey",
  description:
    "二者択一のスプレッドで、AとBを比較して判断のヒントを得ます。",
};

export default function TwoChoicePage() {
  return <DrawSpreadPage spreadId="two-choice" />;
}
