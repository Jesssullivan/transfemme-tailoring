<script lang="ts">
	// DartBuilder — lay out each waist dart from a target intake: the pinch
	// width, the half-width to mark either side of the centerline, and the
	// upper/lower vanish distances for a double-pointed contour (fish-eye) dart
	// on a garment with no waist seam (shirt body, one-piece jacket back).
	// Securing: sew off the fold to nothing and HAND-TIE the tails — never
	// backtack or pivot-lock a dart tip, which permanently dimples the line.
	import { cm } from '$lib/calc/format';

	let dartIntakeTotal = $state(6); // cm total removed in darts (from the Distributor)
	let nDarts = $state(2);
	let upperTaper = $state(20); // cm above the waist where the dart vanishes (18–25)
	let lowerTaper = $state(12); // cm below the waist where it vanishes (10–15)

	const w = $derived(nDarts > 0 ? dartIntakeTotal / nDarts : 0);
	const half = $derived(w / 2);
</script>

<div class="card preset-outlined-surface-500 not-prose my-6 p-4">
	<h3 class="m-0 text-lg font-semibold">Dart builder</h3>
	<p class="mt-1 mb-3 text-xs text-surface-500">
		Double-pointed contour (fish-eye) darts. Sew each from the wide middle out to each point, off the fold into a tail,
		then hand-tie — never backtack a dart tip. Curve the legs slightly concave through the waist for a body-hug.
	</p>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Total dart intake (cm)</span>
			<input class="input" type="number" step="0.5" min="0" bind:value={dartIntakeTotal} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Number of darts</span>
			<input class="input" type="number" step="1" min="1" bind:value={nDarts} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Vanish above waist (cm)</span>
			<input class="input" type="number" step="1" min="0" bind:value={upperTaper} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Vanish below waist (cm)</span>
			<input class="input" type="number" step="1" min="0" bind:value={lowerTaper} />
		</label>
	</div>

	<table class="mt-3 w-full text-sm">
		<caption class="sr-only">Dart layout per dart</caption>
		<tbody>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono whitespace-nowrap">{cm(w)} cm</td>
				<td class="py-1">Pinch width at the waist, per dart</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono whitespace-nowrap">{cm(half)} cm</td>
				<td class="py-1">Mark this each side of the dart centerline at the waist</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono whitespace-nowrap">{cm(upperTaper)} cm</td>
				<td class="py-1">Upper point — above the waist line on the centerline</td>
			</tr>
			<tr class="border-t border-surface-300 dark:border-surface-700">
				<td class="py-1 pr-3 font-mono whitespace-nowrap">{cm(lowerTaper)} cm</td>
				<td class="py-1">Lower point — below the waist line on the centerline</td>
			</tr>
		</tbody>
	</table>

	{#if w > 3}
		<p class="mt-2 text-sm text-warning-700 dark:text-warning-300">
			{cm(w)} cm per dart is past the ~3 cm comfort limit — split into two darts of {cm(w / 2)} cm, or move the surplus to
			a side/center-back seam.
		</p>
	{/if}
	<p class="sr-only" aria-live="polite">
		{`Each dart pinches ${cm(w)} centimetres, ${cm(half)} each side of the centerline, vanishing ${cm(upperTaper)} above and ${cm(lowerTaper)} below the waist.`}
	</p>
</div>
