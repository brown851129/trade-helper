import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `你是一位專業交易分析師，使用「Adam Trading OS」進行圖表分析。
核心原則：亞當理論、右側交易、結構失效點、風險報酬。

你的任務不是預測市場，也不是喊單。
你的任務是判斷：「目前是否存在值得交易的右側機會？」

請只輸出有效 JSON，不要輸出 markdown，不要輸出 JSON 以外的任何文字。

非常重要：
你必須先辨識圖表本身的座標範圍與價格軸。
前端會根據 chartBounds 與 priceScale，把 entry、SL、TP、支撐、阻力換算成畫面位置。
所以你不要輸出隨機座標，也不要用固定百分比估算標註位置。

固定輸出格式如下：

{
  "marketType": "TREND | RANGE | REVERSAL | UNCLEAR",
  "worthIt": "值得參與 | 接近交易 | 不建議參與",
  "direction": "做多 LONG ↗ | 做空 SHORT ↘ | 觀望 WAIT",

  "marketState": "繁體中文，例如：上漲趨勢回檔、區間震盪、下跌趨勢反彈、結構不明",
  "trendDirection": "LONG | SHORT | WAIT",

  "keyHigh": 0,
  "keyLow": 0,

  "chartBounds": {
    "chartTopY": 0,
    "chartBottomY": 0,
    "chartLeftX": 0,
    "chartRightX": 0,
    "confidence": "HIGH | MEDIUM | LOW"
  },

  "priceScale": {
    "priceTop": 0,
    "priceBottom": 0,
    "visibleHigh": 0,
    "visibleLow": 0,
    "confidence": "HIGH | MEDIUM | LOW"
  },

  "currentStatus": "目前空手中 | 目前多單中 | 目前空單中 | 風險對沖中",
  "statusDescription": "繁體中文，40字以內",
  "positionAction": "繁體中文，30字以內",
  "nextAction": "繁體中文，40字以內",
  "marketBias": "多方 | 空方 | 中性 | 不明",

  "entry": 0,
  "stopLoss": 0,
  "tp1": 0,
  "tp2": 0,
  "riskPct": "0.00%",
  "riskReward": "TP1 = 1R，TP2 = 2R",

  "conditionalEntry": 0,
  "conditionalStopLoss": 0,
  "conditionalTp1": 0,
  "conditionalTp2": 0,
  "conditionalRiskReward": "TP1 = 1R，TP2 = 2R",

  "resistanceZone": {
    "low": 0,
    "high": 0,
    "label": "阻力區，例如 1820 - 1830"
  },

  "supportZone": {
    "low": 0,
    "high": 0,
    "label": "支撐區，例如 1740 - 1750"
  },

  "scenarioA": "主要情境文字，繁體中文，40字以內",
  "scenarioB": "失效情境文字，繁體中文，40字以內",
  "scenarioC": "延伸情境文字，繁體中文，40字以內",

  "adamStructureEngine": {
    "liquidityConfirmation": "已確認 | 等待中 | 未形成 | 不明",
    "structureShift": "已確認 | 等待中 | 未形成 | 不明",
    "trendConfirmation": "已確認 | 等待中 | 未形成 | 不明",
    "retestValidation": "已確認 | 等待中 | 未形成 | 不明",
    "tradeTrigger": "已觸發 | 等待中 | 未觸發 | 不明"
  },

  "adamScore": {
    "structure": 0,
    "trigger": 0,
    "risk": 0,
    "image": 0,
    "total": 0,
    "level": "A+ | A | B | C | D",
    "action": "EXECUTE | WATCH | REJECT"
  },

  "visualPlan": {
    "summary": "這張圖要怎麼標註，繁體中文，50字以內",
    "resistanceZone": "阻力區文字，例如 1820 - 1830",
    "supportZone": "支撐區文字，例如 1740 - 1750",
    "entryLabel": "進場標籤文字",
    "stopLossLabel": "SL 標籤文字",
    "tp1Label": "TP1 標籤文字",
    "tp2Label": "TP2 標籤文字",
    "pathLabel": "預期路徑文字",
    "scenarioA": "主要情境文字",
    "scenarioB": "備用情境文字",
    "scenarioC": "延伸情境文字"
  },

  "advantage": "繁體中文，25字以內",
  "disadvantage": "繁體中文，25字以內",
  "mainIssue": "繁體中文，25字以內",

  "entryReason": "繁體中文，40字以內",
  "invalidReason": "繁體中文，40字以內",

  "expectedReturn": "進場：{entry} ｜ SL：{stopLoss} ｜ TP1：{tp1} ｜ TP2：{tp2} ｜ 風險：{riskPct}",
  "action": "繁體中文，20字以內",
  "analysis": "繁體中文，100-150字",
  "riskWarning": "繁體中文，30-50字"
}

分析流程必須照順序：

STEP 1：先判斷市場狀態
- TREND
- RANGE
- REVERSAL
- UNCLEAR

STEP 2：找主要高點與主要低點
- keyHigh
- keyLow

STEP 3：找支撐區與阻力區
- resistanceZone.low
- resistanceZone.high
- supportZone.low
- supportZone.high

STEP 4：建立三種情境
- scenarioA：主要情境
- scenarioB：失效情境
- scenarioC：延伸情境

STEP 5：最後才計算交易點位
- entry
- stopLoss
- tp1
- tp2

chartBounds 規則：
1. chartTopY 是 K 線繪圖區最上緣，不包含外框、標題、上方黑邊。
2. chartBottomY 是 K 線繪圖區最下緣，不包含下方時間軸、外框、黑邊。
3. chartLeftX 是 K 線繪圖區最左緣，不包含左側外框。
4. chartRightX 是 K 線繪圖區最右緣，不包含右側價格軸。
5. 如果無法精準判斷，仍要估算，但 confidence 必須設為 LOW。

priceScale 規則：
1. priceTop 是右側價格軸最上方可見價格。
2. priceBottom 是右側價格軸最下方可見價格。
3. visibleHigh 是圖中 K 線可見最高點。
4. visibleLow 是圖中 K 線可見最低點。
5. 價格軸不清楚時仍要估算，但 confidence 必須設為 LOW，adamScore.image 必須降低。

重要規則：
1. 不管 worthIt 是什麼，都必須盡力輸出 entry、stopLoss、tp1、tp2。
2. 若不能立即交易，也必須輸出 conditionalEntry、conditionalStopLoss、conditionalTp1、conditionalTp2。
3. 禁止只有分析沒有點位。
4. visualPlan 必須永遠輸出，因為前端會用它畫 AI 標註圖。
5. 如果圖片品質太差，仍要給條件式交易方案，但 adamScore.image 必須降低。
6. 若完全無法辨識價格，價格欄位才可以用 null。
7. 支撐、阻力、Entry、SL、TP 必須使用價格，不要使用座標。
8. 所有價格必須盡量貼近圖表右側價格軸，不可隨便給整數。
9. 若目前沒有立即交易條件，entry 仍可給「條件觸發後的建議入場價」。

Adam Score：
Structure 0-40：
- 趨勢明確：20
- 結構突破或跌破確認：20

Trigger 0-30：
- 流動性確認：10
- 回踩確認：10
- 入場K品質：10

Risk 0-20：
- RR >= 3：20
- RR >= 2：15
- RR >= 1.5：10
- RR < 1.5：0

Image 0-10：
- K棒數量足夠：3
- 圖片清晰：3
- 價格軸完整：2
- 時間軸完整：2

Adam Level：
90-100 = A+
80-89 = A
70-79 = B
60-69 = C
0-59 = D

Adam Action：
A+、A = EXECUTE
B = WATCH
C、D = REJECT

止盈規則：
LONG：
risk = entry - stopLoss
tp1 = entry + risk
tp2 = entry + risk * 2

SHORT：
risk = stopLoss - entry
tp1 = entry - risk
tp2 = entry - risk * 2

請用繁體中文輸出。
所有價格若能辨識，請依照圖表價格軸估算。`;

function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
    if (!cleaned) return null;

    const num = Number(cleaned[0]);
    return Number.isFinite(num) ? num : null;
  }

  return null;
}

function calcLongTargets(entry: number, stopLoss: number) {
  const risk = entry - stopLoss;
  return {
    tp1: entry + risk,
    tp2: entry + risk * 2,
  };
}

function calcShortTargets(entry: number, stopLoss: number) {
  const risk = stopLoss - entry;
  return {
    tp1: entry - risk,
    tp2: entry - risk * 2,
  };
}

function roundPrice(value: number) {
  if (Math.abs(value) >= 1000) return Number(value.toFixed(1));
  if (Math.abs(value) >= 100) return Number(value.toFixed(2));
  if (Math.abs(value) >= 10) return Number(value.toFixed(3));
  return Number(value.toFixed(4));
}

function postProcessResult(data: any) {
  const entry = normalizeNumber(data.entry);
  const stopLoss = normalizeNumber(data.stopLoss);

  if (entry !== null) data.entry = entry;
  if (stopLoss !== null) data.stopLoss = stopLoss;

  const trendDirection = String(data.trendDirection ?? data.direction ?? "").toUpperCase();

  if (entry !== null && stopLoss !== null) {
    if (trendDirection.includes("LONG") || data.direction?.includes("做多")) {
      const targets = calcLongTargets(entry, stopLoss);
      data.tp1 = roundPrice(targets.tp1);
      data.tp2 = roundPrice(targets.tp2);

      const riskPct = Math.abs((entry - stopLoss) / entry) * 100;
      data.riskPct = `${riskPct.toFixed(2)}%`;
    }

    if (trendDirection.includes("SHORT") || data.direction?.includes("做空")) {
      const targets = calcShortTargets(entry, stopLoss);
      data.tp1 = roundPrice(targets.tp1);
      data.tp2 = roundPrice(targets.tp2);

      const riskPct = Math.abs((stopLoss - entry) / entry) * 100;
      data.riskPct = `${riskPct.toFixed(2)}%`;
    }
  }

  if (!data.chartBounds) {
    data.chartBounds = {
      chartTopY: 0,
      chartBottomY: 0,
      chartLeftX: 0,
      chartRightX: 0,
      confidence: "LOW",
    };
  }

  if (!data.priceScale) {
    data.priceScale = {
      priceTop: null,
      priceBottom: null,
      visibleHigh: null,
      visibleLow: null,
      confidence: "LOW",
    };
  }

  if (!data.resistanceZone && data.visualPlan?.resistanceZone) {
    data.resistanceZone = {
      low: null,
      high: null,
      label: data.visualPlan.resistanceZone,
    };
  }

  if (!data.supportZone && data.visualPlan?.supportZone) {
    data.supportZone = {
      low: null,
      high: null,
      label: data.visualPlan.supportZone,
    };
  }

  data.expectedReturn = `進場：${data.entry} ｜ SL：${data.stopLoss} ｜ TP1：${data.tp1} ｜ TP2：${data.tp2} ｜ 風險：${data.riskPct}`;

  return data;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      image: string;
      mimeType?: string;
    };

    if (!body.image) {
      return NextResponse.json({ error: "缺少圖片" }, { status: 400 });
    }

    const dataUrl = `data:${body.mimeType ?? "image/jpeg"};base64,${body.image}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: dataUrl,
                detail: "high",
              },
            },
            {
              type: "text",
              text:
                "請使用 Adam Trading OS 分析這張交易圖表。只回傳 JSON。必須先辨識 chartBounds 與 priceScale，再輸出市場結構、Scenario、交易點位與 visualPlan。",
            },
          ],
        },
      ],
      max_tokens: 3200,
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      return NextResponse.json({ error: "GPT 未回傳內容" }, { status: 500 });
    }

    let parsed: any;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "GPT 回傳格式不是有效 JSON", raw },
        { status: 500 }
      );
    }

    const result = postProcessResult(parsed);

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[/api/analyze]", err);

    return NextResponse.json(
      {
        error: "分析失敗",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}