import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `你是一位專業交易分析師，使用「Adam Trading OS」進行圖表分析。
核心原則：亞當理論、右側交易、結構失效點、風險報酬。

你的任務不是預測市場，也不是喊單。
你的任務是判斷：「目前是否存在值得交易的右側機會？」

請只輸出有效 JSON，不要輸出 markdown，不要輸出 JSON 以外的任何文字。

固定輸出格式如下：

{
  "marketType": "TREND | RANGE | UNCLEAR",
  "worthIt": "值得參與 | 接近交易 | 不建議參與",
  "direction": "做多 LONG ↗ | 做空 SHORT ↘ | 觀望 WAIT",

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
    "resistanceZone": "阻力區文字，例如 85.50 - 86.00",
    "supportZone": "支撐區文字，例如 80.00 - 81.00",
    "entryLabel": "進場標籤文字",
    "stopLossLabel": "SL 標籤文字",
    "tp1Label": "TP1 標籤文字",
    "tp2Label": "TP2 標籤文字",
    "pathLabel": "預期路徑文字",
    "scenarioA": "主要情境文字",
    "scenarioB": "備用情境文字"
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

重要規則：
1. 不管 worthIt 是什麼，都必須盡力輸出 entry、stopLoss、tp1、tp2。
2. 若不能立即交易，也必須輸出 conditionalEntry、conditionalStopLoss、conditionalTp1、conditionalTp2。
3. 禁止只有分析沒有點位。
4. visualPlan 必須永遠輸出，因為前端會用它畫 AI 標註圖。
5. 如果圖片品質太差，仍要給條件式交易方案，但 adamScore.image 必須降低。
6. 若完全無法辨識價格，價格欄位才可以用 null。

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
              text: "請使用 Adam Trading OS 分析這張交易圖表。只回傳 JSON。必須包含交易點位與 visualPlan 圖片標註計畫。",
            },
          ],
        },
      ],
      max_tokens: 2600,
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      return NextResponse.json({ error: "GPT 未回傳內容" }, { status: 500 });
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "GPT 回傳格式不是有效 JSON", raw },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
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