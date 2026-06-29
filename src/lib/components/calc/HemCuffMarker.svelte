<script lang="ts">
	// HemCuffMarker — current vs desired finished length → the fold/cut lines for
	// a plain blind hem or a turn-up cuff, on trousers or sleeves. The invisible
	// hem itself is hand-sewn (slip/catch-stitch); the fold/cut math is the same.
	// Top reference = waist for trousers, shoulder for sleeves.
	import { round1, fmt } from '$lib/calc/format';
	import { measurements } from '$lib/calc/measurements.svelte';

	let Lcurrent = $state(108); // current finished length from the top reference
	let Ltarget = $state(102); // desired finished length
	let H = $state(4); // hem allowance / turn-up depth (≈4 trousers, ≈2.5 sleeves)
	let mode = $state<'plain' | 'cuff'>('plain');
	let C = $state(4); // cuff depth (cuff mode)

	const S = $derived(Lcurrent - Ltarget); // amount to shorten (positive)
	const cutLine = $derived(mode === 'cuff' ? Ltarget + 2 * C + H : Ltarget + H);
	const fabricBelow = $derived(mode === 'cuff' ? 2 * C + H : H);
</script>

<div class="card preset-outlined-surface-500 not-prose my-6 p-4">
	<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
		<h3 class="m-0 text-lg font-semibold">Hem &amp; cuff marker</h3>
		<div class="flex gap-1" role="group" aria-label="Hem or cuff">
			{#each ['plain', 'cuff'] as m (m)}
				<button
					type="button"
					class="badge {mode === m ? 'preset-filled-primary-500' : 'preset-outlined-surface-500'}"
					aria-pressed={mode === m}
					onclick={() => (mode = m as 'plain' | 'cuff')}
				>
					{m === 'plain' ? 'plain hem' : 'turn-up cuff'}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Current length ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={Lcurrent} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Target length ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={Ltarget} />
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Hem allowance ({measurements.unit})</span>
			<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={H} />
		</label>
		{#if mode === 'cuff'}
			<label class="flex flex-col gap-1 text-sm">
				<span class="text-surface-600 dark:text-surface-400">Cuff depth ({measurements.unit})</span>
				<input class="input font-mono tabular-nums" type="number" step="0.5" min="0" bind:value={C} />
			</label>
		{/if}
	</div>

	{#if S < 0}
		<p class="mt-3 text-sm text-warning-700 dark:text-warning-300">
			The target is {fmt(-S, measurements.unit)} longer than the current length — you must
			<em>let down</em> existing hem allowance instead; you can only lengthen up to (existing allowance − {fmt(
				H,
				measurements.unit,
			)}).
		</p>
	{:else}
		<table class="mt-3 w-full text-sm">
			<caption class="sr-only">Hem / cuff fold and cut lines</caption>
			<tbody>
				<tr class="border-t border-surface-300 dark:border-surface-700">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(S, measurements.unit)}</td>
					<td class="py-1">Amount to shorten</td>
				</tr>
				<tr class="border-t border-surface-300 dark:border-surface-700">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(Ltarget, measurements.unit)}</td>
					<td class="py-1">
						{mode === 'cuff' ? 'Bottom-of-cuff fold' : 'Fold line'} — measured from the top reference
					</td>
				</tr>
				{#if mode === 'cuff'}
					<tr class="border-t border-surface-300 dark:border-surface-700">
						<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(Ltarget + C, measurements.unit)}</td>
						<td class="py-1">Turn-up fold</td>
					</tr>
					<tr class="border-t border-surface-300 dark:border-surface-700">
						<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(Ltarget + 2 * C, measurements.unit)}</td
						>
						<td class="py-1">Inside (cuff-top) fold</td>
					</tr>
				{/if}
				<tr class="border-t-2 border-surface-400 dark:border-surface-600 font-semibold">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(cutLine, measurements.unit)}</td>
					<td class="py-1"
						>Cut line — trim everything below ({fmt(fabricBelow, measurements.unit)} of fabric below the finished length)</td
					>
				</tr>
			</tbody>
		</table>
		<p class="mt-2 text-xs text-surface-500">
			Finish the raw edge, then hand slip/catch-stitch the hem invisibly. Re-press the leg crease last. Confirm the
			length basted-and-pinned on the body before you trim.
		</p>
	{/if}
	<p class="sr-only" aria-live="polite">
		{S >= 0
			? `Shorten ${round1(S)} ${measurements.unit}: fold at ${round1(Ltarget)}, cut at ${round1(cutLine)} from the top reference.`
			: 'Target is longer than current; let down existing allowance instead.'}
	</p>
</div>
