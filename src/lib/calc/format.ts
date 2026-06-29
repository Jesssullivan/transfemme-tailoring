// Shared formatting helpers for the alteration calculators.
// All calculator inputs/outputs are in centimetres; the body is metric with an
// inch echo for the imperial-brained. Math lives in each component's $derived
// values (mirrors the tinyland-goo scaler split: thin data + a shared engine).

export const CM_PER_IN = 2.54;

/** The working unit. All stored numbers are in this unit; toggling converts
 * the whole profile (the calculator math is linear, so it is unit-agnostic). */
export type Unit = 'cm' | 'in';

/** Round to 0.1 for display; em-dash for a non-finite value (no unit label). */
export function round1(n: number): string {
	return Number.isFinite(n) ? n.toFixed(1) : '—';
}

/** A value already in the working `unit`, rounded with the unit label appended. */
export function fmt(n: number, unit: Unit = 'cm'): string {
	return Number.isFinite(n) ? `${n.toFixed(1)} ${unit}` : '—';
}

/** Convert a number between units (used when toggling the working unit). */
export function convert(n: number, from: Unit, to: Unit): number {
	if (from === to || !Number.isFinite(n)) return n;
	return from === 'cm' ? n / CM_PER_IN : n * CM_PER_IN;
}

/** Round to 0.1 cm for display; em-dash for a non-finite value. */
export function cm(n: number): string {
	return Number.isFinite(n) ? n.toFixed(1) : '—';
}

/** A cm value with its inch equivalent, e.g. `5.0 cm (1.97″)`. */
export function cmIn(n: number): string {
	return Number.isFinite(n) ? `${n.toFixed(1)} cm (${(n / CM_PER_IN).toFixed(2)}″)` : '—';
}
