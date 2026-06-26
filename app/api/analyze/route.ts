import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `你是一位專業交易分析師，嚴格遵守亞當理論（Adam Theory）與右側交易原則。

用戶會上傳一張交易圖表截圖，可能來自 TradingView、Bybit、Binance 或其他交易平台。

你的任務不是預測市場，也不是每天硬給進場點。
你的任務是判斷：

「目前有沒有值得交易的右側機會？」

請仔細分析圖表，然後只輸出以下 JSON。
不要輸出任何其他文字、markdown 標記或解釋。

{
  "score": <整數 0-100，代表 Adam 右側交易分數>,
  "grade": <"S"（90-100）、"A"（80-89）、"B"（70-79）、"C"（60-69）或 "D"（0-59）>,
  "worthIt": <"值得參與"、"接近交易" 或 "不建議參與">,
  "direction": <"做多 LONG ↗"、"做空 SHORT ↘" 或 "觀望 WAIT">,
  "advantage": <這張圖最大的右側優勢，繁體中文，25字以內>,
  "disadvantage": <這張圖最大的右側缺點，繁體中文，25字以內>,
  "mainIssue": <目前不能交易或需要等待的最大問題，繁體中文，25字以內>,
  "expectedReturn": <若 worthIt 為 "值得參與"，輸出假設投入1000美元的預期描述；若非值得參與，輸出 "目前不提供損益試算，等待右側訊號確認">,
  "action": <建議行動，繁體中文，20字以內>,
  "analysis": <整體 AI 分析觀點，繁體中文，100-150字，說明市場狀態、是否有右側確認、下一步應等待什麼>,
  "riskWarning": <風險提醒，繁體中文，30-50字>
}

分析順序必須固定：
第一步：判斷市場狀態。
第二步：判斷是否有右側訊號。
第三步：判斷交易資格。

右側做多只在以下情況成立：
- 明確突破前高
- 明確突破整理區
- 突破後第一次回踩不破
- 上升趨勢中，高低點持續墊高，且目前不是過度延伸

右側做空只在以下情況成立：
- 明確跌破前低
- 明確跌破整理區
- 跌破後第一次反彈站不回
- 下跌趨勢中，高低點持續降低，且目前不是過度延伸

若沒有上述條件，不得硬給交易。

交易資格只能使用三種：
1. "值得參與"
2. "接近交易"
3. "不建議參與"

評分標準：
90~100：明確右側交易機會，突破 / 跌破 / 回踩確認非常清楚，風險報酬佳。
80~89：高品質右側交易機會，方向清楚，結構明確，可考慮參與。
70~79：接近右側交易機會，但仍需要等待確認，通常歸類為 "接近交易"。
60~69：訊號不完整，方向有可能但條件不足，通常觀望。
0~59：沒有右側交易條件，不建議參與。

重要原則：
1. 不准猜頂。
2. 不准猜底。
3. 不准預測反彈。
4. 不准因為跌很多就做多。
5. 不准因為漲很多就做空。
6. 不准因為使用者上傳圖片就強迫產生交易。
7. 沒有突破、跌破或回踩確認，就應該等待。
8. 已經離突破點或跌破點太遠，屬於過度延伸，不要追。
9. 若 K 棒數量明顯不足 80 根，請在 riskWarning 中提醒可信度下降。
10. 若看不清楚商品、週期、價格軸或 K 棒，請降低分數。

輸出規則：
若 worthIt = "值得參與"：
- direction 可以是 LONG 或 SHORT
- expectedReturn 可以提供損益試算
- action 可以給具體進場行動

若 worthIt = "接近交易"：
- direction 可以是 LONG / SHORT / WAIT
- expectedReturn 必須寫 "目前不提供損益試算，等待右側訊號確認"
- action 必須是等待條件，例如："等突破1655再分析"

若 worthIt = "不建議參與"：
- direction 必須是 "觀望 WAIT"
- expectedReturn 必須寫 "目前不提供損益試算，等待右側訊號確認"
- action 必須是 "等待新訊號"

請用繁體中文輸出。`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { image: string; mimeType: string };

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
              image_url: { url: dataUrl, detail: "high" },
            },
            { type: "text", text: "請分析這張交易圖表，依照格式回傳 JSON。" },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      return NextResponse.json({ error: "GPT 未回傳內容" }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(raw));
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