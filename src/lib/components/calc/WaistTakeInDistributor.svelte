<script lang="ts">
	// WaistTakeInDistributor — the gap between a too-big garment and the target
	// body, split across the center-back seam, both side seams, and the waist
	// darts, converted to exact offsets to mark. A SEAM removes 2× its marked
	// offset (it eats both panels meeting there); a DART removes its full
	// pinched width. Back-loaded by default. Feeds the Dart builder.
	import { round1, fmt } from '$lib/calc/format';
	import { measurements } from '$lib/calc/measurements.svelte';

	let garmentWaistFlat = $state(52); // measured flat (single layer), buttoned
	let bodyWaist = $state(82); // true natural waist over the shapewear/forms worn
	let ease = $state(2); // wearing ease at the waist (1.5–2.5)
	let cbPct = $state(20); // % of the intake taken at the center-back seam
	let sidePct = $state(30); // % across the two side seams
	let dartPct = $state(50); // % across the waist darts (back-loaded)
	let nDarts = $state(2); // count of waist darts (2 = two back darts)

	const G = $derived(garmentWaistFlat * 2); // garment waist circumference
	const target = $derived(bodyWaist + ease);
	const R = $derived(G - target); // total circumference to remove
	const pctSum = $derived(cbPct + sidePct + dartPct);

	const cbOffset = $derived((R * cbPct) / 100 / 2);
	const sideOffsetEach = $derived((R * sidePct) / 100 / 4);
	const dartWidthEach = $derived(nDarts > 0 ? (R * dartPct) / 100 / nDarts : 0);
	const dartHalfEach = $derived(dartWidthEach / 2);
	const checksum = $derived(2 * cbOffset + 4 * sideOffsetEach + nDarts * dartWidthEach);

	const myWaist = $derived(measurements.body0('waist', 0));
</script>

<div class="card preset-outlined-surface-500 not-prose my-6 p-4">
	<h3 class="m-0 text-lg font-semibold">Waist take-in distributor</h3>
	<p class="mt-1 mb-3 text-xs text-surface-500">
		Splits the total waist intake across the center-back seam, both side seams, and the darts, then gives the offset to
		mark at each. A seam removes 2× its marked offset; a dart removes its full pinched width.
	</p>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Garment waist, flat ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={garmentWaistFlat} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Body waist ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={bodyWaist} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Ease ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={ease} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Center-back %</span>
			<input class="input font-mono tabular-nums" type="number" step="5" min="0" max="100" bind:value={cbPct} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Side seams %</span>
			<input class="input font-mono tabular-nums" type="number" step="5" min="0" max="100" bind:value={sidePct} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Darts %</span>
			<input class="input font-mono tabular-nums" type="number" step="5" min="0" max="100" bind:value={dartPct} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Number of darts</span>
			<input class="input font-mono tabular-nums" type="number" step="1" min="0" bind:value={nDarts} />
		</label>
	</div>

	{#if myWaist > 0}
		<button type="button" class="badge preset-outlined-primary-500 mt-3" onclick={() => (bodyWaist = myWaist)}>
			↺ Use my waist ({fmt(myWaist, measurements.unit)})
		</button>
	{/if}

	{#if pctSum !== 100}
		<p class="mt-3 text-sm text-warning-700 dark:text-warning-300">
			Distribution adds to {pctSum}% — adjust so center-back + sides + darts = 100%.
		</p>
	{/if}

	{#if R <= 0}
		<p class="mt-3 text-sm text-warning-700 dark:text-warning-300">
			Total to remove is {fmt(R, measurements.unit)} — the garment already fits or must be
			<em>let out</em>, not taken in.
		</p>
	{:else}
		<table class="mt-3 w-full text-sm">
			<caption class="sr-only">Waist take-in distribution</caption>
			<tbody>
				<tr class="border-t border-surface-300 dark:border-surface-700">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(R, measurements.unit)}</td>
					<td class="py-1">Total circumference to remove (R)</td>
				</tr>
				<tr class="border-t border-surface-300 dark:border-surface-700">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(cbOffset, measurements.unit)}</td>
					<td class="py-1">Mark <span class="font-medium">in</span> from the existing center-back seam</td>
				</tr>
				<tr class="border-t border-surface-300 dark:border-surface-700">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(sideOffsetEach, measurements.unit)}</td>
					<td class="py-1">Mark in at <span class="font-medium">each</span> side seam</td>
				</tr>
				<tr class="border-t border-surface-300 dark:border-surface-700">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(dartWidthEach, measurements.unit)}</td>
					<td class="py-1">
						Pinch width per dart (½ = {fmt(dartHalfEach, measurements.unit)} each side of the dart centerline)
					</td>
				</tr>
			</tbody>
		</table>
		{#if dartWidthEach > 3}
			<p class="mt-2 text-sm text-warning-700 dark:text-warning-300">
				Each dart is {fmt(dartWidthEach, measurements.unit)} — past ~3 cm a single dart points and puckers. Add a dart or
				shift the surplus to a seam.
			</p>
		{/if}
		<p class="mt-2 text-xs text-surface-500">
			Checksum: 2×CB + 4×side + {nDarts}×dart = {fmt(checksum, measurements.unit)} ≈ R. Hand the per-dart width to the Dart
			builder. Back-load the split (more at the back darts + center-back); keep the front light so the closure lies flat.
		</p>
	{/if}
	<p class="sr-only" aria-live="polite">
		{R > 0
			? `Remove ${round1(R)} ${measurements.unit} total: ${round1(cbOffset)} at center back, ${round1(sideOffsetEach)} each side seam, ${round1(dartWidthEach)} per dart.`
			: 'Garment already fits or must be let out.'}
	</p>
</div>
