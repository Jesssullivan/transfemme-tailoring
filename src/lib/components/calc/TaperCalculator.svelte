<script lang="ts">
	// TaperCalculator — current-vs-target circumferences at two heights (bicep &
	// cuff for a sleeve; fullest thigh/knee & hem for a leg) → the seam offsets
	// to mark. Each seam removes 2× its offset, split over S seams. For an
	// athletic build, set the upper target ≈ the upper current so the upper
	// offset stays ~0: the slim comes from the lower leg / wrist, never from
	// strangling the quad or the flexed bicep.
	import { round1, fmt } from '$lib/calc/format';
	import { measurements } from '$lib/calc/measurements.svelte';
	import Glyph from '$lib/components/Glyph.svelte';

	let upperCurrent = $state(40); // garment circ at the upper point (bicep / thigh)
	let upperTarget = $state(40); // target finished circ at the upper point (body flexed + ease)
	let lowerCurrent = $state(28); // garment circ at the lower point (cuff / hem)
	let lowerTarget = $state(22); // target finished circ at the lower point
	let nSeams = $state(1); // 1 = underarm or inseam only; 2 = inseam + outseam

	const R1 = $derived(upperCurrent - upperTarget);
	const R2 = $derived(lowerCurrent - lowerTarget);
	const o1 = $derived(nSeams > 0 ? R1 / (2 * nSeams) : 0);
	const o2 = $derived(nSeams > 0 ? R2 / (2 * nSeams) : 0);
</script>

<div class="card preset-outlined-surface-500 not-prose my-6 border-t-2 border-t-primary-500/40 p-4">
	<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
		<h3 class="m-0 flex items-center gap-2 text-lg font-semibold">
			<Glyph name="calculator" class="text-primary-500" />Sleeve / leg taper
		</h3>
		<div class="flex gap-1" role="group" aria-label="Number of taper seams">
			{#each [1, 2] as s (s)}
				<button
					type="button"
					class="badge min-h-10 px-3 {nSeams === s ? 'preset-filled-primary-500' : 'preset-outlined-surface-500'}"
					aria-pressed={nSeams === s}
					onclick={() => (nSeams = s)}
				>
					{s} seam{s > 1 ? 's' : ''}
				</button>
			{/each}
		</div>
	</div>
	<p class="mt-1 mb-3 text-xs text-surface-500">
		One seam = underarm (sleeve) or inseam only; two = inseam + outseam. Keep the upper target equal to the upper
		current over muscle so the offset there is ~0.
	</p>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Upper now ({measurements.unit})</span>
			<input
				class="input min-h-11 font-mono text-base tabular-nums"
				type="number"
				step="0.5"
				min="0"
				bind:value={upperCurrent}
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Upper target ({measurements.unit})</span>
			<input
				class="input min-h-11 font-mono text-base tabular-nums"
				type="number"
				step="0.5"
				min="0"
				bind:value={upperTarget}
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Lower now ({measurements.unit})</span>
			<input
				class="input min-h-11 font-mono text-base tabular-nums"
				type="number"
				step="0.5"
				min="0"
				bind:value={lowerCurrent}
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Lower target ({measurements.unit})</span>
			<input
				class="input min-h-11 font-mono text-base tabular-nums"
				type="number"
				step="0.5"
				min="0"
				bind:value={lowerTarget}
			/>
		</label>
	</div>

	<div class="my-4 grid grid-cols-2 gap-4 rounded-container bg-surface-100-900 p-4">
		<div>
			<div
				class="font-mono text-3xl leading-none font-bold tabular-nums text-primary-700 sm:text-4xl dark:text-primary-300"
			>
				{round1(o1)}<span class="ml-1 text-base font-normal text-surface-500">{measurements.unit}</span>
			</div>
			<div class="mt-1 text-xs tracking-wide text-surface-500 uppercase">Upper offset / seam</div>
		</div>
		<div>
			<div
				class="font-mono text-3xl leading-none font-bold tabular-nums text-primary-700 sm:text-4xl dark:text-primary-300"
			>
				{round1(o2)}<span class="ml-1 text-base font-normal text-surface-500">{measurements.unit}</span>
			</div>
			<div class="mt-1 text-xs tracking-wide text-surface-500 uppercase">Lower offset / seam</div>
		</div>
	</div>

	<table class="mt-3 w-full text-sm">
		<caption class="sr-only">Taper offsets to mark</caption>
		<tbody>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(o1, measurements.unit)}</td>
				<td class="py-1">Offset to mark in at the <span class="font-medium">upper</span> point (each seam)</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(o2, measurements.unit)}</td>
				<td class="py-1">Offset to mark in at the <span class="font-medium">lower</span> point (each seam)</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap"
					>{fmt(R1, measurements.unit)} / {fmt(R2, measurements.unit)}</td
				>
				<td class="py-1">Total reduction at the upper / lower point</td>
			</tr>
		</tbody>
	</table>

	{#if o1 < 0 || o2 < 0}
		<p class="mt-2 flex items-start gap-2 text-sm text-warning-700 dark:text-warning-300">
			<Glyph name="triangle-exclamation" class="mt-0.5" />
			<span>
				A target is larger than the garment here (negative offset) — that point must be
				<em>let out</em>, not taken in. Check you have the seam allowance for it.
			</span>
		</p>
	{/if}
	<p class="mt-2 text-xs text-surface-500">
		Mark the new seam inset {fmt(o1, measurements.unit)} at the upper point, tapering to {fmt(o2, measurements.unit)}
		at the lower; above the upper point curve smoothly back to the original seam over 4–8 cm. Legs: keep the offset 0 through
		seat and thigh, diverge only at/below the knee. Sleeves: stop the taper above the flexed bicep, slim elbow-to-wrist only.
	</p>
	<p class="sr-only" aria-live="polite">
		{`Mark ${round1(o1)} ${measurements.unit} in at the upper point and ${round1(o2)} at the lower, on each of ${nSeams} seam${nSeams > 1 ? 's' : ''}.`}
	</p>
</div>
