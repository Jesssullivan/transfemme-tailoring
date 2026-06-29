import { browser } from '$app/environment';
import { convert, type Unit } from './format';

/**
 * Measurements profile for transfemme-tailoring.
 *
 * Enter your body (and per-garment flat) measurements ONCE; every calculator
 * reads them, and they persist to localStorage so live tailoring needs no
 * rebuild. Numbers are stored in the current working `unit`; toggling the unit
 * converts the whole profile (the calculator math is linear, so unit-agnostic).
 *
 * Mirrors the persistence pattern of `src/lib/theme.svelte.ts` (a `$state`
 * class singleton with a `browser`-guarded load). Private by design: nothing
 * leaves the device unless you Export the JSON file.
 */

const KEY = 'tt-measurements-v1';

/** Body measurements. 0 = unset. Keys are referenced by the calculators. */
export interface BodyProfile {
	waist: number;
	naturalWaistHeight: number;
	hip: number;
	highHip: number;
	fullBust: number;
	highBust: number;
	underbust: number;
	shoulderWidth: number;
	acrossBack: number;
	bicepFlexed: number;
	bicepRelaxed: number;
	wrist: number;
	armLength: number;
	thigh: number;
	knee: number;
	calf: number;
	ankle: number;
	inseam: number;
	outseam: number;
	frontRise: number;
	backRise: number;
	neck: number;
	pantsFinished: number;
	sleeveFinished: number;
	shirtFinished: number;
	jacketFinished: number;
}

export const BODY_FIELDS: { key: keyof BodyProfile; label: string; group: 'torso' | 'arm' | 'leg' | 'length' }[] = [
	{ key: 'fullBust', label: 'Full bust / chest', group: 'torso' },
	{ key: 'highBust', label: 'High bust / upper chest', group: 'torso' },
	{ key: 'underbust', label: 'Underbust', group: 'torso' },
	{ key: 'waist', label: 'Natural waist', group: 'torso' },
	{ key: 'naturalWaistHeight', label: 'Waist height (nape→waist)', group: 'torso' },
	{ key: 'highHip', label: 'High hip (≈8 cm below waist)', group: 'torso' },
	{ key: 'hip', label: 'Full hip / seat', group: 'torso' },
	{ key: 'shoulderWidth', label: 'Shoulder point-to-point', group: 'torso' },
	{ key: 'acrossBack', label: 'Across-back (blade to blade)', group: 'torso' },
	{ key: 'neck', label: 'Neck', group: 'torso' },
	{ key: 'bicepFlexed', label: 'Bicep — flexed', group: 'arm' },
	{ key: 'bicepRelaxed', label: 'Bicep — relaxed', group: 'arm' },
	{ key: 'wrist', label: 'Wrist', group: 'arm' },
	{ key: 'armLength', label: 'Arm length (shoulder→wrist)', group: 'arm' },
	{ key: 'thigh', label: 'Thigh (fullest)', group: 'leg' },
	{ key: 'knee', label: 'Knee', group: 'leg' },
	{ key: 'calf', label: 'Calf', group: 'leg' },
	{ key: 'ankle', label: 'Ankle / hem opening', group: 'leg' },
	{ key: 'inseam', label: 'Inseam', group: 'leg' },
	{ key: 'outseam', label: 'Outseam', group: 'leg' },
	{ key: 'frontRise', label: 'Front rise', group: 'leg' },
	{ key: 'backRise', label: 'Back rise', group: 'leg' },
	{ key: 'pantsFinished', label: 'Trouser finished length', group: 'length' },
	{ key: 'sleeveFinished', label: 'Sleeve finished length', group: 'length' },
	{ key: 'shirtFinished', label: 'Shirt finished length', group: 'length' },
	{ key: 'jacketFinished', label: 'Jacket finished length', group: 'length' },
];

function emptyBody(): BodyProfile {
	return Object.fromEntries(BODY_FIELDS.map((f) => [f.key, 0])) as unknown as BodyProfile;
}

/** Per-garment flat measurements, keyed by garment then field. */
export type GarmentFlats = Record<string, Record<string, number>>;

interface PersistShape {
	v: 1;
	unit: Unit;
	body: Partial<BodyProfile>;
	garments: GarmentFlats;
}

class MeasurementsStore {
	unit = $state<Unit>('cm');
	body = $state<BodyProfile>(emptyBody());
	garments = $state<GarmentFlats>({});
	initialized = $state(false);

	/** True once at least one body field is set — used to pre-fill calculators. */
	hasData = $derived(Object.values(this.body).some((v) => v > 0));

	init() {
		if (!browser || this.initialized) {
			this.initialized = true;
			return;
		}
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) {
				const p = JSON.parse(raw) as PersistShape;
				if (p.unit === 'cm' || p.unit === 'in') this.unit = p.unit;
				if (p.body) this.body = { ...emptyBody(), ...p.body };
				if (p.garments) this.garments = p.garments;
			}
		} catch {
			/* corrupt or unavailable — keep defaults */
		}
		this.initialized = true;
	}

	save() {
		if (!browser) return;
		try {
			const shape: PersistShape = { v: 1, unit: this.unit, body: this.body, garments: this.garments };
			localStorage.setItem(KEY, JSON.stringify(shape));
		} catch {
			/* quota / unavailable — non-fatal */
		}
	}

	setUnit(to: Unit) {
		if (to === this.unit) return;
		const from = this.unit;
		for (const k of Object.keys(this.body) as (keyof BodyProfile)[]) {
			if (this.body[k]) this.body[k] = +convert(this.body[k], from, to).toFixed(2);
		}
		for (const g of Object.keys(this.garments)) {
			for (const f of Object.keys(this.garments[g])) {
				this.garments[g][f] = +convert(this.garments[g][f], from, to).toFixed(2);
			}
		}
		this.unit = to;
		this.save();
	}

	/** Read a body field (the working-unit number), or `fallback` if unset. */
	body0(key: keyof BodyProfile, fallback = 0): number {
		const v = this.body[key];
		return v > 0 ? v : fallback;
	}

	garmentFlat(garment: string, field: string, fallback = 0): number {
		const v = this.garments[garment]?.[field];
		return v && v > 0 ? v : fallback;
	}

	setGarmentFlat(garment: string, field: string, value: number) {
		if (!this.garments[garment]) this.garments[garment] = {};
		this.garments[garment][field] = value;
		this.save();
	}

	reset() {
		this.body = emptyBody();
		this.garments = {};
		this.save();
	}

	exportJSON(): string {
		return JSON.stringify(
			{ v: 1, unit: this.unit, body: this.body, garments: this.garments } satisfies PersistShape,
			null,
			2,
		);
	}

	importJSON(text: string): boolean {
		try {
			const p = JSON.parse(text) as PersistShape;
			if (p.unit === 'cm' || p.unit === 'in') this.unit = p.unit;
			this.body = { ...emptyBody(), ...(p.body ?? {}) };
			this.garments = p.garments ?? {};
			this.save();
			return true;
		} catch {
			return false;
		}
	}
}

export const measurements = new MeasurementsStore();

// Hydrate once on the client, before any component effect runs (avoids the
// autosave effect clobbering stored data with empty defaults).
if (browser) measurements.init();
