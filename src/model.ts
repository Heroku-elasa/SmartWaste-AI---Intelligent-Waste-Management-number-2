// Financial model — mirrors plan/real.py and plan/scope.py (single source of truth for the dashboard)
export const RATE = 235_000; // Toman per USD, 28 Sep 2026 (6 Mehr 1405)
export const HOURS = 4800;
export const YIELD = 0.8;
export const VAR_COST = 20_000; // Toman per kg granule
export const TAX = 0.25;
export const RAMP = [0.4, 0.55, 0.65, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7];

export type Plant = { key: 'small' | 'big'; capKgH: number; fixed: number; capex: number; wc: number };
export const PLANTS: Record<'small' | 'big', Plant> = {
  small: { key: 'small', capKgH: 400, fixed: 15, capex: 31, wc: 4 },
  big: { key: 'big', capKgH: 1000, fixed: 34, capex: 84, wc: 10 },
};

export type YearResult = { util: number; outT: number; rev: number; cost: number; dep: number; net: number; cf: number };

/** One operating year. Prices in Toman/kg; money results in billion Toman. */
export function year(p: Plant, util: number, granule = 100_000, waste = 45_000): YearResult {
  const inputT = (p.capKgH * HOURS * util) / 1000;
  const outT = inputT * YIELD;
  const rev = (outT * granule) / 1e6;
  const cost = (inputT * waste) / 1e6 + (outT * VAR_COST) / 1e6 + p.fixed;
  const dep = (p.capex - p.wc) / 10;
  const ebt = rev - cost - dep;
  const net = ebt > 0 ? ebt * (1 - TAX) : ebt;
  return { util, outT, rev, cost, dep, net, cf: net + dep };
}

export function projection(p: Plant, granule: number, waste: number, years = 5): YearResult[] {
  return RAMP.slice(0, years).map((u) => year(p, u, granule, waste));
}

/** Payback in years on cumulative cash flow (null = not within 10 years). */
export function payback(p: Plant, granule: number, waste: number): number | null {
  let cum = 0;
  for (let i = 0; i < RAMP.length; i++) {
    const cf = year(p, RAMP[i], granule, waste).cf;
    if (cf > 0 && cum + cf >= p.capex) return i + (p.capex - cum) / cf;
    cum += cf;
  }
  return null;
}

export const usd = (bnToman: number) => (bnToman * 1e9) / RATE;

export const SCENARIOS = [
  { id: 'pess', granule: 85_000, waste: 45_000 },
  { id: 'base', granule: 100_000, waste: 45_000 },
  { id: 'target', granule: 110_000, waste: 35_000 },
  { id: 'opt', granule: 115_000, waste: 45_000 },
] as const;

// Three execution scopes (from plan/scope.py)
export const SCOPES = [
  { id: 'ten', big: 7, small: 3, stations: 0, capex: 715, profitNow: 135, profitTarget: 507, pbNow: 4.7, pbTarget: 2.3, jobs: 211, outT: 22_042 },
  { id: 'half', big: 16, small: 60, stations: 590, capex: 5_842, profitNow: 622, profitTarget: 2_436, pbNow: 7.5, pbTarget: 3.2, jobs: 2_890, outT: 107_520 },
  { id: 'all', big: 31, small: 120, stations: 1_177, capex: 11_584, profitNow: 1_227, profitTarget: 4_810, pbNow: 7.5, pbTarget: 3.2, jobs: 5_746, outT: 212_352 },
] as const;

export const USE_OF_FUNDS = [
  { id: 'machinery', bn: 18 }, { id: 'building', bn: 5 }, { id: 'wc', bn: 4 }, { id: 'permits', bn: 4 },
] as const;

// Waste-to-energy (SATBA guaranteed tariff, 1404: thermochemical 55,500 rial/kWh; anaerobic digestion 36,850; landfill gas 25,000)
export const WTE_TARIFF_RIAL = { incineration: 55_500, digestion: 36_850, landfill: 25_000 } as const;

/** Simple WtE plant economics. mw = net MW, cf = capacity factor, capexUsdPerMw, opex share of revenue. */
export const TONS_PER_MW_DAY = 40; // ~0.55 MWh net per tonne of mixed Iranian MSW

export function wte(mw: number, tariffRial: number, capexUsdPerMw: number, gateFeeToman = 0, cfactor = 0.8, opexShare = 0.35) {
  const mwh = mw * 8760 * cfactor;
  const tons = mw * TONS_PER_MW_DAY * 365 * cfactor;
  const revBn = (mwh * 1000 * tariffRial) / 10 / 1e9 + (tons * gateFeeToman) / 1e9; // rial -> toman -> bn
  const capexBn = (mw * capexUsdPerMw * RATE) / 1e9;
  const ebitdaBn = revBn * (1 - opexShare);
  return { tons, mwh, revBn, capexBn, ebitdaBn, simplePayback: ebitdaBn > 0 ? capexBn / ebitdaBn : Infinity, revUsd: usd(revBn) };
}
