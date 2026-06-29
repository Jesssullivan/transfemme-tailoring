<script lang="ts">
	// TaperCalculator — current-vs-target circumferences at two heights (bicep &
	// cuff for a sleeve; fullest thigh/knee & hem for a leg) → the seam offsets
	// to mark. Each seam removes 2× its offset, split over S seams. For an
	// athletic build, set the upper target ≈ the upper current so the upper
	// offset stays ~0: the slim look comes from the lower leg / wrist, never from
	// strangling the quad or the flexed bicep. Blend back to the original seam
	// above the upper point so the armscye / seat is never tightened.
	import { cm } from '$lib/calc/format';

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

<div class="card preset-outlined-surface-500 not-prose my-6 p-4">
	<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
		<h3 class="m-0 text-lg font-semibold">Sleeve / leg taper</h3>
		<div class="flex gap-1" role="group" aria-label="Number of taper seams">
			{#each [1, 2] as s (s)}
				<button
					type="button"
					class="badge {nSeams === s ? 'preset-filled-primary-500' : 'preset-outlined-surface-500'}"
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
			<span class="text-surface-600 dark:text-surface-400">Upper now (cm)</span>
			<input class="input" type="number" step="0.5" min="0" bind:value={upperCurrent} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Upper target (cm)</span>
			<input class="input" type="number" step="0.5" min="0" bind:value={upperTarget} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Lower now (cm)</span>
			<input class="input" type="number" step="0.5" min="0" bind:value={lowerCurrent} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Lower target (cm)</span>
			<input class="input" type="number" step="0.5" min="0" bind:value={lowerTarget} />
		</label>
	</div>

	<table class="mt-3 w-full text-sm">
		<caption class="sr-only">Taper offsets to mark</caption>
		<tbody>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono whitespace-nowrap">{cm(o1)} cm</td>
				<td class="py-1">Offset to mark in at the <span class="font-medium">upper</span> point (each seam)</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono whitespace-nowrap">{cm(o2)} cm</td>
				<td class="py-1">Offset to mark in at the <span class="font-medium">lower</span> point (each seam)</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono whitespace-nowrap">{cm(R1)} / {cm(R2)} cm</td>
				<td class="py-1">Total reduction at the upper / lower point</td>
			</tr>
		</tbody>
	</table>

	{#if o1 < 0 || o2 < 0}
		<p class="mt-2 text-sm text-warning-700 dark:text-warning-300">
			A target is larger than the garment here (negative offset) — that point must be
			<em>let out</em>, not taken in. Check you have the seam allowance for it.
		</p>
	{/if}
	<p class="mt-2 text-xs text-surface-500">
		Mark the new seam inset {cm(o1)} cm at the upper point, tapering to {cm(o2)} cm at the lower; above the upper point curve
		smoothly back to the original seam over 4–8 cm. Legs: keep the offset 0 through seat and thigh, diverge only at/below
		the knee. Sleeves: stop the taper above the flexed bicep, slim elbow-to-wrist only.
	</p>
	<p class="sr-only" aria-live="polite">
		{`Mark ${cm(o1)} centimetres in at the upper point and ${cm(o2)} at the lower, on each of ${nSeams} seam${nSeams > 1 ? 's' : ''}.`}
	</p>
</div>
