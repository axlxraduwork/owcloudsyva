export type RegionId = "global" | "americas" | "emea" | "apac";

export type RegionConfig = {
  id: RegionId;
  label: string;
  subtitle: string;
  summary: string;
};

export type Hotspot = {
  id: string;
  name: string;
  x: number;
  y: number;
  regions: RegionId[];
};

export const regions: RegionConfig[] = [
  {
    id: "global",
    label: "Global",
    subtitle: "Worldwide Coverage",
    summary: "跨區交付、統一治理與在地落地並行，建立可持續擴張的 SaaS 營運能力。",
  },
  {
    id: "americas",
    label: "Americas",
    subtitle: "North & South America",
    summary: "支援美洲多據點產品部署，優化成本、可用性與跨團隊協作效率。",
  },
  {
    id: "emea",
    label: "EMEA",
    subtitle: "Europe, Middle East, Africa",
    summary: "以合規與資安為核心，建立在地法規對齊的資料與雲端治理架構。",
  },
  {
    id: "apac",
    label: "APAC",
    subtitle: "Asia Pacific",
    summary: "面向高成長市場，打造低延遲、高韌性且可快速迭代的產品基礎設施。",
  },
];

export const hotspots: Hotspot[] = [
  { id: "vancouver", name: "Vancouver", x: 16, y: 33, regions: ["global", "americas"] },
  { id: "sao-paulo", name: "Sao Paulo", x: 30, y: 66, regions: ["global", "americas"] },
  { id: "london", name: "London", x: 46, y: 33, regions: ["global", "emea"] },
  { id: "dubai", name: "Dubai", x: 57, y: 44, regions: ["global", "emea", "apac"] },
  { id: "singapore", name: "Singapore", x: 69, y: 58, regions: ["global", "apac"] },
  { id: "tokyo", name: "Tokyo", x: 77, y: 37, regions: ["global", "apac"] },
  { id: "sydney", name: "Sydney", x: 82, y: 75, regions: ["global", "apac"] },
];

export const capabilityCards = [
  {
    title: "Cloud + AI Strategy",
    tag: "Strategy",
    summary: "用明確架構藍圖把商業需求轉成可上線的產品里程碑。",
  },
  {
    title: "Platform Engineering",
    tag: "Delivery",
    summary: "建立高可用、可維運的 SaaS 技術基礎，縮短發佈週期。",
  },
  {
    title: "Security Governance",
    tag: "Compliance",
    summary: "在成長期同時守住資安、法規與稽核要求。",
  },
];
