export type MegaKey = "about" | "trends";

type MegaSection = {
  title: string;
  links: Array<{ label: string; desc: string; to: string }>;
};

export const megaMenus: Record<MegaKey, { heading: string; sections: MegaSection[] }> = {
  about: {
    heading: "公司簡介",
    sections: [
      {
        title: "公司定位",
        links: [
          { label: "我們是誰", desc: "Cloudsyva 品牌與核心理念", to: "/about" },
          { label: "服務模式", desc: "從策略到落地的端到端交付", to: "/about" },
          { label: "全球交付", desc: "跨區域架構與營運治理能力", to: "/about" },
        ],
      },
      {
        title: "專業能力",
        links: [
          { label: "AI 導入顧問", desc: "從 PoC 到可量產流程", to: "/about" },
          { label: "雲端平台建置", desc: "高可用與可擴充架構", to: "/about" },
          { label: "資安與合規", desc: "稽核與風險治理設計", to: "/about" },
        ],
      },
      {
        title: "合作開始",
        links: [
          { label: "預約諮詢", desc: "30 分鐘需求盤點", to: "/contact" },
          { label: "聯繫團隊", desc: "1 個工作天內回覆", to: "/contact" },
          { label: "導入流程", desc: "Webflow 到自建官網重構", to: "/about" },
        ],
      },
    ],
  },
  trends: {
    heading: "趨勢文章",
    sections: [
      {
        title: "熱門主題",
        links: [
          { label: "Applied AI", desc: "企業 AI 應用與導入框架", to: "/trends" },
          { label: "Cloud Governance", desc: "雲端治理與成本控管", to: "/trends" },
          { label: "Data Strategy", desc: "跨區資料與法規策略", to: "/trends" },
        ],
      },
      {
        title: "精選內容",
        links: [
          { label: "案例解析", desc: "從需求到上線的關鍵決策", to: "/trends" },
          { label: "技術實務", desc: "工程團隊的落地方法論", to: "/trends" },
          { label: "營運指標", desc: "成效追蹤與 KPI 管理", to: "/trends" },
        ],
      },
      {
        title: "實做攻略",
        links: [
          { label: "訂閱更新", desc: "接收每月趨勢彙整", to: "/contact" },
          { label: "客製研究", desc: "針對產業需求提供建議", to: "/contact" },
          { label: "查看全部文章", desc: "探索完整洞察資料庫", to: "/trends" },
        ],
      },
    ],
  },
};
