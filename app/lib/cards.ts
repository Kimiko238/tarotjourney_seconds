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
  { id: "22", name: "ワンド1" },
  { id: "23", name: "ワンド2" },
  { id: "24", name: "ワンド3" },
  { id: "25", name: "ワンド4" },
  { id: "26", name: "ワンド5" },
  { id: "27", name: "ワンド6" },
  { id: "28", name: "ワンド7" },
  { id: "29", name: "ワンド8" },
  { id: "30", name: "ワンド9" },
  { id: "31", name: "ワンド10" },
  { id: "32", name: "ワンドのペイジ" },
  { id: "33", name: "ワンドのナイト" },
  { id: "34", name: "ワンドのクイーン" },
  { id: "35", name: "ワンドのキング" },
  { id: "36", name: "カップ1" },
  { id: "37", name: "カップ2" },
  { id: "38", name: "カップ3" },
  { id: "39", name: "カップ4" },
  { id: "40", name: "カップ5" },
  { id: "41", name: "カップ6" },
  { id: "42", name: "カップ7" },
  { id: "43", name: "カップ8" },
  { id: "44", name: "カップ9" },
  { id: "45", name: "カップ10" },
  { id: "46", name: "カップのペイジ" },
  { id: "47", name: "カップのナイト" },
  { id: "48", name: "カップのクイーン" },
  { id: "49", name: "カップのキング" },
  { id: "50", name: "ソード1" },
  { id: "51", name: "ソード2" },
  { id: "52", name: "ソード3" },
  { id: "53", name: "ソード4" },
  { id: "54", name: "ソード5" },
  { id: "55", name: "ソード6" },
  { id: "56", name: "ソード7" },
  { id: "57", name: "ソード8" },
  { id: "58", name: "ソード9" },
  { id: "59", name: "ソード10" },
  { id: "60", name: "ソードのペイジ" },
  { id: "61", name: "ソードのナイト" },
  { id: "62", name: "ソードのクイーン" },
  { id: "63", name: "ソードのキング" },
  { id: "64", name: "ペンタクル1" },
  { id: "65", name: "ペンタクル2" },
  { id: "66", name: "ペンタクル3" },
  { id: "67", name: "ペンタクル4" },
  { id: "68", name: "ペンタクル5" },
  { id: "69", name: "ペンタクル6" },
  { id: "70", name: "ペンタクル7" },
  { id: "71", name: "ペンタクル8" },
  { id: "72", name: "ペンタクル9" },
  { id: "73", name: "ペンタクル10" },
  { id: "74", name: "ペンタクルのペイジ" },
  { id: "75", name: "ペンタクルのナイト" },
  { id: "76", name: "ペンタクルのクイーン" },
  { id: "77", name: "ペンタクルのキング" },
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
