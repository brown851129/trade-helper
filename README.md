# 浩穎研究室 — 猛健樂 2.5 mg 一頁式網站

Next.js 14（App Router）＋ TypeScript ＋ Tailwind CSS ＋ Framer Motion ＋ Recharts。

## 本機執行

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 正式建置
```

需要 Node.js 18.17 以上。

## 部署到 Vercel（最簡單）

1. 把整個資料夾推到 GitHub。
2. 到 vercel.com → Add New Project → 選這個 repo → Deploy。不需要任何環境變數。

## 結構

```
app/            layout.tsx（字型、SEO）、page.tsx（組合各區塊）、globals.css
components/     Hero / Opinion / JapanStudy / Surmount（Recharts 圖表）/ ThreeThings / Official / Conclusion / References / Footer
lib/data.ts     所有研究數據與文獻連結（唯一的數據來源）
```

## 修改數據

所有數字都集中在 `lib/data.ts`。如果要改，請先回到原始文獻核對。
畫面上的「研究事實」與「浩穎觀點」用不同標籤區分，新增內容時請沿用。

## 數據核對紀錄（2026-11-17）

- 日本研究（Amioka et al., Diabetes Obes Metab 2026, PMID 42521631）：分析 112 人（2.5 mg 58 人、5 mg 54 人），6 個月平均體重下降 15.3% vs 16.1%（p = 0.563），不良事件 35% vs 50%。多中心、前瞻性、非隨機；劑量由醫病共同決策決定。
- SURMOUNT-1（Jastreboff et al., NEJM 2022）：2,539 人，72 週；安慰劑 −3.1%、5 mg −15.0%、10 mg −19.5%、15 mg −20.9%（含 95% CI）。
- FDA Mounjaro 仿單：起始 2.5 mg 每週一次，4 週後增加至 5 mg；之後可每次加 2.5 mg（至少間隔 4 週），最高 15 mg。
