import { PLANTS, payback, year, wte, WTE_TARIFF_RIAL } from '../src/model.ts';
const s = PLANTS.small;
const eq = (a: number, b: number, tol: number, msg: string) => { if (Math.abs(a - b) > tol) { console.error('FAIL', msg, a, b); process.exit(1); } console.log('ok', msg, a.toFixed(2)); };
eq(year(s, 0.7).net, 5.9, 0.1, 'small plant net profit at 70%');
eq(payback(s, 100_000, 45_000)!, 5.3, 0.15, 'base payback');
eq(payback(s, 110_000, 35_000)!, 2.1, 0.15, 'target payback');
if (payback(s, 85_000, 45_000) !== null) { console.error('FAIL pessimistic should never pay back'); process.exit(1); }
console.log('ok pessimistic = never');
const w = wte(5, WTE_TARIFF_RIAL.incineration, 6_000_000);
console.log('WtE 5MW incineration payback years:', w.simplePayback.toFixed(1));
