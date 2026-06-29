<script lang="ts">
	// SeamReserveCheck — before you cut: is the garment physically wide enough to
	// hit target with seam allowance, how much fabric sits beyond the new stitch
	// line, and how much let-out reserve you keep. Default to fold-and-baste
	// (reversible) until the body fitting confirms — cutting wool is irreversible
	// and an over-take-in shows old needle holes and press-shine if let back out.
	import { fmt } from '$lib/calc/format';
	import { measurements } from '$lib/calc/measurements.svelte';

	let offset = $state(2); // inset being removed at this seam (from Distributor / Taper)
	let originalSA = $state(1.5); // seam allowance already in the garment here
	let SAkeep = $state(1.5); // SA to keep on the new stitch line
	let garmentFlat = $state(52); // flat width available at the narrowest altered level
	let targetCirc = $state(84); // target finished circumference at that level
	let seamsCrossing = $state(2); // how many seams cross this level

	const feasible = $derived(garmentFlat * 2 >= targetCirc + 2 * SAkeep * seamsCrossing);
	const excessPerSeam = $derived(originalSA + offset);
	const wasteIfTrimmed = $derived(originalSA + offset - SAkeep);
</script>

<div class="card preset-outlined-surface-500 not-prose my-6 p-4">
	<h3 class="m-0 text-lg font-semibold">Seam allowance &amp; reversibility check</h3>
	<p class="mt-1 mb-3 text-xs text-surface-500">
		Run this before committing a cut. Fold-and-baste (don't trim) for the first wearing test, then trim to the kept
		allowance only after the fit is locked.
	</p>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Garment flat here ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={garmentFlat} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Target circumference ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={targetCirc} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Seams crossing here</span>
			<input class="input font-mono tabular-nums" type="number" step="1" min="1" bind:value={seamsCrossing} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Offset at this seam ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={offset} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Original allowance ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={originalSA} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Allowance to keep ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={SAkeep} />
		</label>
	</div>

	<p class="mt-3">
		<span class="badge {feasible ? 'preset-filled-success-500' : 'preset-filled-error-500'}" aria-live="polite">
			{feasible ? 'Go — wide enough to hit target' : 'No-go — not enough width for target + allowance'}
		</span>
	</p>

	<table class="mt-3 w-full text-sm">
		<caption class="sr-only">Seam reserve</caption>
		<tbody>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(excessPerSeam, measurements.unit)}</td>
				<td class="py-1">Fabric beyond the new stitch line, per seam (original allowance + offset)</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(wasteIfTrimmed, measurements.unit)}</td>
				<td class="py-1">Waste per seam if you trim down to the kept allowance</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(SAkeep, measurements.unit)}</td>
				<td class="py-1">Let-out reserve retained (more, if you fold-and-baste instead of cutting)</td>
			</tr>
		</tbody>
	</table>
	<p class="mt-2 text-xs text-surface-500">
		After you do trim, finish the raw edge with pinking shears / a pinking-blade rotary, turn-and-stitch, a Hong-Kong
		bind, or a hand overcast — a straight-stitch machine has no serger.
	</p>
</div>
