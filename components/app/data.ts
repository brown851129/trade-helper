export type Outcome = "win" | "loss" | "neutral";
export type Trend = "up" | "down" | "flat";
export type Grade = "S" | "A" | "B" | "C";

export type Trade = {
  sym: string;
  tf?: string;
  dir: string;
  dirEn?: string;
  score: number;
  grade: Grade;
  rr?: string;
  result: string;
  outcome: Outcome;
  trend: Trend;
  time: string;
  dateStr?: string;
  entryRange?: string;
  exitPrice?: string;
};

export const DIR_COLOR: Record<string, string> = {
  做多: "text-mint",
  做空: "text-danger",
  觀望: "text-ink-faint",
};

export const GRADE_COLOR: Record<Grade, string> = {
  S: "text-cyan2 border-cyan2/40 bg-cyan2/10",
  A: "text-mint border-mint/40 bg-mint/10",
  B: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  C: "text-ink-dim border-white/15 bg-white/5",
};

export const OUTCOME_BADGE: Record<Outcome, string> = {
  win: "text-mint border-mint/40 bg-mint/10",
  loss: "text-danger border-danger/30 bg-danger/10",
  neutral: "text-ink-dim border-white/10 bg-white/5",
};

export const RECENT: Trade[] = [
  {
    sym: "BTCUSDT", dir: "做多", dirEn: "LONG", score: 84, grade: "A",
    rr: "1 : 2.6", result: "TP2 達成", outcome: "win", trend: "up",
    time: "1 小時前", dateStr: "2024/05/24 14:30",
    entryRange: "67,120 ~ 67,680", exitPrice: "71,250",
  },
  {
    sym: "ETHUSDT", dir: "做多", dirEn: "LONG", score: 79, grade: "B",
    rr: "1 : 3.1", result: "TP1 達成", outcome: "win", trend: "up",
    time: "3 小時前", dateStr: "2024/05/24 11:20",
    entryRange: "3,650 ~ 3,720", exitPrice: "3,845",
  },
  {
    sym: "SOLUSDT", dir: "做多", dirEn: "LONG", score: 91, grade: "S",
    rr: "1 : 3.3", result: "TP3 達成", outcome: "win", trend: "up",
    time: "5 小時前", dateStr: "2024/05/23 22:15",
    entryRange: "166.2 ~ 169.0", exitPrice: "176.8",
  },
  {
    sym: "ARBUSDT", dir: "做多", dirEn: "LONG", score: 88, grade: "A",
    rr: "1 : 2.9", result: "TP2 達成", outcome: "win", trend: "up",
    time: "1 天前", dateStr: "2024/05/23 16:45",
    entryRange: "1.085 ~ 1.125", exitPrice: "1.182",
  },
];

export const HISTORY: Trade[] = [
  ...RECENT,
  {
    sym: "DOGEUSDT", dir: "做空", dirEn: "SHORT", score: 72, grade: "B",
    rr: "1 : 2.1", result: "TP1 達成", outcome: "win", trend: "down",
    time: "2 天前", dateStr: "2024/05/22 19:30",
    entryRange: "0.1520 ~ 0.1560", exitPrice: "0.1442",
  },
  {
    sym: "XRPUSDT", dir: "做多", dirEn: "LONG", score: 84, grade: "A",
    rr: "1 : 2.6", result: "TP2 達成", outcome: "win", trend: "up",
    time: "2 天前", dateStr: "2024/05/22 10:15",
    entryRange: "0.6120 ~ 0.6180", exitPrice: "0.6830",
  },
  {
    sym: "LPTUSDT", dir: "做多", dirEn: "LONG", score: 76, grade: "A",
    rr: "1 : 2.2", result: "TP1 達成", outcome: "win", trend: "up",
    time: "3 天前", dateStr: "2024/05/21 15:20",
    entryRange: "14.50 ~ 14.80", exitPrice: "15.90",
  },
  {
    sym: "ADAUSDT", dir: "做多", dirEn: "LONG", score: 88, grade: "A",
    rr: "1 : 2.9", result: "TP2 達成", outcome: "win", trend: "up",
    time: "3 天前", dateStr: "2024/05/21 08:45",
    entryRange: "0.4420 ~ 0.4480", exitPrice: "0.4980",
  },
  {
    sym: "MATICUSDT", dir: "做空", dirEn: "SHORT", score: 65, grade: "B",
    rr: "1 : 1.7", result: "止損", outcome: "loss", trend: "down",
    time: "4 天前", dateStr: "2024/05/20 20:30",
    entryRange: "0.7850 ~ 0.7920", exitPrice: "0.8240",
  },
  {
    sym: "INJUSDT", dir: "做多", dirEn: "LONG", score: 81, grade: "A",
    rr: "1 : 3.0", result: "TP2 達成", outcome: "win", trend: "up",
    time: "4 天前", dateStr: "2024/05/20 14:10",
    entryRange: "23.50 ~ 24.00", exitPrice: "27.20",
  },
  {
    sym: "TIAUSDT", dir: "觀望", score: 47, grade: "C",
    result: "未進場", outcome: "neutral", trend: "flat",
    time: "5 天前", dateStr: "2024/05/19 17:30",
  },
  {
    sym: "SUIUSDT", dir: "做多", dirEn: "LONG", score: 76, grade: "A",
    rr: "1 : 2.5", result: "TP1 達成", outcome: "win", trend: "up",
    time: "5 天前", dateStr: "2024/05/19 09:15",
    entryRange: "1.050 ~ 1.075", exitPrice: "1.185",
  },
];
