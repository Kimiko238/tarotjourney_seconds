import type { Metadata } from "next";

import DrawSpreadPage from "@/app/draw/_components/DrawSpreadPage";
import { getSpreadById, spreads } from "@/app/draw/_data/spreads";

type DrawSpreadRouteProps = {
  params: { spread: string };
};

export function generateStaticParams() {
  return spreads.map((spread) => ({ spread: spread.id }));
}

export function generateMetadata({
  params,
}: DrawSpreadRouteProps): Metadata {
  const spread = getSpreadById(params.spread);
  if (!spread) {
    return {
      title: "タロットを引く | Tarot Journey",
      description:
        "タロットカードを引いて、今のあなたへのメッセージを受け取ります。",
    };
  }

  return {
    title: `${spread.name} | Tarot Journey`,
    description: `${spread.name}のスプレッドでタロットを引き、気づきを得るためのガイドです。`,
  };
}

export default function DrawSpreadRoute({ params }: DrawSpreadRouteProps) {
  return <DrawSpreadPage spreadId={params.spread} />;
}
