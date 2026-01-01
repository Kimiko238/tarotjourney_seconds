import type { Card } from "@/app/lib/cards";

export type SpreadPromptArgs = {
  concern: string;
  cardResults: string;
};

export type SpreadConfig = {
  id: string;
  name: string;
  cardCount: number;
  layout: "one-card" | "celtic-cross";
  buildPrompt: (args: SpreadPromptArgs) => string;
};

const buildDetailedPrompt = (concern: string, cardResults: string) => `あなたは現実的で判断力のある優秀な占い師です。
「${concern}」という悩みに対して、
タロットカードの結果として「${cardResults}」が示されています。

以下のルールに従ってカードリーディングを行い、助言してください。

【出力ルール】
1. まず、この結果が示す「状況の核心」を1文で述べる。
2. 次に、相談者が今どんな状態に置かれているかを具体的に説明する。
3. その上で、今取るべき行動・取らない方がよい行動をはっきり示す。
4. 最後に、短期的な結論（今は動く／待つ／方向を変える等）を明確に書く。
5. 抽象的な励ましや曖昧な表現で終わらせないこと。
`;

export const spreads: SpreadConfig[] = [
  {
    id: "one-card",
    name: "1枚引き",
    cardCount: 1,
    layout: "one-card",
    buildPrompt: ({ concern, cardResults }) =>
      buildDetailedPrompt(concern, cardResults),
  },
  {
    id: "celtic-cross",
    name: "ケルト十字",
    cardCount: 10,
    layout: "celtic-cross",
    buildPrompt: ({ concern, cardResults }) =>
      buildDetailedPrompt(concern, cardResults),
  },
];

export function normalizeSpreadId(id: string) {
  if (id === "one") return "one-card";
  if (id === "celtic") return "celtic-cross";
  return id;
}

export function getSpreadById(id: string): SpreadConfig | undefined {
  const normalizedId = normalizeSpreadId(id);
  return spreads.find((spread) => spread.id === normalizedId);
}

export function formatCardResult(card: Card) {
  const orientation = card.isReversed ? "逆位置" : "正位置";
  return `${card.name}（${orientation}）`;
}
