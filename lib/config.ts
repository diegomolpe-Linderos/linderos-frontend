// lib/config.ts
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Linderos Digital';
export const IS_DEMO = process.env.NEXT_PUBLIC_IS_DEMO === 'true';

export const COLORS = {
  bgStart: process.env.NEXT_PUBLIC_BG_START || '#0b1535',
  bgMid: process.env.NEXT_PUBLIC_BG_MID || '#0f1e44',
  bgEnd: process.env.NEXT_PUBLIC_BG_END || '#162a63',
  card: process.env.NEXT_PUBLIC_CARD_BG || '#12204f',
  accent: process.env.NEXT_PUBLIC_ACCENT || '#1e90ff',
};

export const POWER_BI_URL = process.env.NEXT_PUBLIC_POWERBI_URL || '';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';