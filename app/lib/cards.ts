export type Card = {
  id: string;
  name: string;
  isReversed?: boolean;
};

export const cardList: Card[] = [
  { id: "0", name: "愚者" },
  { id: "1", name: "魔術師" },
  { id: "2", name: "女教皇" },
  { id: "3", name: "女帝" },
  { id: "4", name: "皇帝" },
  { id: "5", name: "法王" },
  { id: "6", name: "恋人" },
  { id: "7", name: "戦車" },
  { id: "8", name: "力" },
  { id: "9", name: "隠者" },
  { id: "10", name: "運命の輪" },
  { id: "11", name: "正義" },
  { id: "12", name: "吊るされた男" },
  { id: "13", name: "死神" },
  { id: "14", name: "節制" },
  { id: "15", name: "悪魔" },
  { id: "16", name: "塔" },
  { id: "17", name: "星" },
  { id: "18", name: "月" },
  { id: "19", name: "太陽" },
  { id: "20", name: "審判" },
  { id: "21", name: "世界" },
];

export function drawOne(): Card {
  const baseCard = cardList[Math.floor(Math.random() * cardList.length)];
  const isReversed = Math.random() < 0.5;
  return { ...baseCard, isReversed };
}

export function drawMany(count: number): Card[] {
  if (count <= 0) return [];
  const pool = [...cardList];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length)).map((card) => ({
    ...card,
    isReversed: Math.random() < 0.5,
  }));
}

export function getCardImagePath(id: string) {
  return `/cards/${id}.png`;
}
