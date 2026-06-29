import { describe, it, expect } from 'vitest';
import { round1, fmt, convert, cm, cmIn, CM_PER_IN } from './format';

describe('format', () => {
	it('round1 rounds to 0.1 and em-dashes non-finite', () => {
		expect(round1(5)).toBe('5.0');
		expect(round1(5.04)).toBe('5.0');
		expect(round1(5.06)).toBe('5.1');
		expect(round1(NaN)).toBe('—');
		expect(round1(Infinity)).toBe('—');
	});

	it('fmt appends the working unit label', () => {
		expect(fmt(5, 'cm')).toBe('5.0 cm');
		expect(fmt(2, 'in')).toBe('2.0 in');
		expect(fmt(Infinity, 'cm')).toBe('—');
	});

	it('convert is a no-op for same unit and finite-only', () => {
		expect(convert(5, 'cm', 'cm')).toBe(5);
		expect(convert(NaN, 'cm', 'in')).toBeNaN();
	});

	it('convert cm <-> in matches CM_PER_IN and round-trips', () => {
		expect(CM_PER_IN).toBe(2.54);
		expect(convert(2.54, 'cm', 'in')).toBeCloseTo(1, 10);
		expect(convert(1, 'in', 'cm')).toBeCloseTo(2.54, 10);
		for (const x of [0, 12.5, 37, 101.6]) {
			expect(convert(convert(x, 'cm', 'in'), 'in', 'cm')).toBeCloseTo(x, 10);
		}
	});

	it('cm / cmIn keep their cm semantics', () => {
		expect(cm(5)).toBe('5.0');
		expect(cmIn(2.54)).toBe('2.5 cm (1.00″)');
	});
});
