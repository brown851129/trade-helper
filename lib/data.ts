// 所有數據均取自原始文獻摘要，請勿修改數值。
// 核對日期：2026-11-17

export const sources = {
  japan: {
    id: 1,
    label: "2026 日本 2.5 mg 與 5 mg 比較研究",
    citation:
      "Amioka M, Amioka H, Kinoshita H, Sairaku A, Nakano Y. Low-Dose Tirzepatide for Obesity: Comparative Efficacy of 2.5 mg Versus 5 mg in Non-Diabetic Japanese Adults. Diabetes, Obesity and Metabolism. 2026.",
    url: "https://pubmed.ncbi.nlm.nih.gov/42521631/",
  },
  surmount: {
    id: 2,
    label: "SURMOUNT-1 臨床試驗",
    citation:
      "Jastreboff AM, Aronne LJ, Ahmad NN, et al. Tirzepatide Once Weekly for the Treatment of Obesity. N Engl J Med. 2022;387:205–216. DOI: 10.1056/NEJMoa2206038",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038",
  },
  fda: {
    id: 3,
    label: "FDA Mounjaro 官方仿單",
    citation:
      "U.S. Food and Drug Administration. MOUNJARO (tirzepatide) injection — Prescribing Information. NDA 215866.",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/215866s041lbl.pdf",
  },
} as const;

/** 日本多中心前瞻性、非隨機世代研究（Diabetes Obes Metab 2026） */
export const japanStudy = {
  analysed: 112,
  n25: 58,
  n5: 54,
  months: 6,
  weightLoss: { d25: 15.3, d5: 16.1 }, // 平均體重下降 %
  weightLossKg: { d25: 12.3, d5: 13.0 },
  pValue: 0.563,
  adverseEvents: { d25: 35, d5: 50 }, // 不良事件比例 %
};

/** SURMOUNT-1（NEJM 2022），72 週，平均體重變化 % 與 95% CI */
export const surmount1 = {
  n: 2539,
  weeks: 72,
  arms: [
    { group: "安慰劑", dose: 0, value: 3.1, ciLow: 1.9, ciHigh: 4.3 },
    { group: "5 mg", dose: 5, value: 15.0, ciLow: 14.2, ciHigh: 15.9 },
    { group: "10 mg", dose: 10, value: 19.5, ciLow: 18.5, ciHigh: 20.4 },
    { group: "15 mg", dose: 15, value: 20.9, ciLow: 19.9, ciHigh: 21.8 },
  ],
};
