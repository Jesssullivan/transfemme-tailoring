<script lang="ts">
	// HemCuffMarker — current vs desired finished length → the fold/cut lines for
	// a plain blind hem or a turn-up cuff, on trousers or sleeves. The invisible
	// hem itself is hand-sewn (slip/catch-stitch); the fold/cut math is the same.
	// Top reference = waist for trousers, shoulder for sleeves.
	import { round1, fmt } from '$lib/calc/format';
	import { measurements } from '$lib/calc/measurements.svelte';
	import Glyph from '$lib/components/Glyph.svelte';

	let Lcurrent = $state(108); // current finished length from the top reference
	let Ltarget = $state(102); // desired finished length
	let H = $state(4); // hem allowance / turn-up depth (≈4 trousers, ≈2.5 sleeves)
	let mode = $state<'plain' | 'cuff'>('plain');
	let C = $state(4); // cuff depth (cuff mode)

	const S = $derived(Lcurrent - Ltarget); // amount to shorten (positive)
	const cutLine = $derived(mode === 'cuff' ? Ltarget + 2 * C + H : Ltarget + H);
	const fabricBelow = $derived(mode === 'cuff' ? 2 * C + H : H);
</script>

<div class="card preset-outlined-surface-500 not-prose my-6 border-t-2 border-t-primary-500/40 p-4">
	<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
		<h3 class="m-0 flex items-center gap-2 text-lg font-semibold">
			<Glyph name="calculator" class="text-primary-500" />Hem &amp; cuff marker
		</h3>
		<div class="flex gap-1" role="group" aria-label="Hem or cuff">
			{#each ['plain', 'cuff'] as m (m)}
				<button
					type="button"
					class="badge min-h-10 px-3 {mode === m ? 'preset-filled-primary-500' : 'preset-outlined-surface-500'}"
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
			<input
				class="input min-h-11 font-mono text-base tabular-nums"
				type="number"
				step="0.5"
				min="0"
				bind:value={Lcurrent}
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Target length ({measurements.unit})</span>
			<input
				class="input min-h-11 font-mono text-base tabular-nums"
				type="number"
				step="0.5"
				min="0"
				bind:value={Ltarget}
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm">
			<span class="text-surface-600 dark:text-surface-400">Hem allowance ({measurements.unit})</span>
			<input class="input min-h-11 font-mono text-base tabular-nums" type="number" step="0.5" min="0" bind:value={H} />
		</label>
		{#if mode === 'cuff'}
			<label class="flex flex-col gap-1 text-sm">
				<span class="text-surface-600 dark:text-surface-400">Cuff depth ({measurements.unit})</span>
				<input
					class="input min-h-11 font-mono text-base tabular-nums"
					type="number"
					step="0.5"
					min="0"
					bind:value={C}
				/>
			</label>
		{/if}
	</div>

	{#if S < 0}
		<p class="mt-3 flex items-start gap-2 text-sm text-warning-700 dark:text-warning-300">
			<Glyph name="triangle-exclamation" class="mt-0.5" />
			<span>
				The target is {fmt(-S, measurements.unit)} longer than the current length — you must
				<em>let down</em> existing hem allowance instead; you can only lengthen up to (existing allowance − {fmt(
					H,
					measurements.unit,
				)}).
			</span>
		</p>
	{:else}
		<div class="my-4 grid grid-cols-2 gap-4 rounded-container bg-surface-100-900 p-4 sm:grid-cols-3">
			<div>
				<div
					class="font-mono text-3xl leading-none font-bold tabular-nums text-primary-700 sm:text-4xl dark:text-primary-300"
				>
					{round1(S)}<span class="ml-1 text-base font-normal text-surface-500">{measurements.unit}</span>
				</div>
				<div class="mt-1 text-xs tracking-wide text-surface-500 uppercase">Shorten by</div>
			</div>
			<div>
				<div
					class="font-mono text-3xl leading-none font-bold tabular-nums text-primary-700 sm:text-4xl dark:text-primary-300"
				>
					{round1(Ltarget)}<span class="ml-1 text-base font-normal text-surface-500">{measurements.unit}</span>
				</div>
				<div class="mt-1 text-xs tracking-wide text-surface-500 uppercase">Fold line</div>
			</div>
			<div>
				<div
					class="font-mono text-3xl leading-none font-bold tabular-nums text-primary-700 sm:text-4xl dark:text-primary-300"
				>
					{round1(cutLine)}<span class="ml-1 text-base font-normal text-surface-500">{measurements.unit}</span>
				</div>
				<div class="mt-1 flex items-center gap-1 text-xs tracking-wide text-surface-500 uppercase">
					<Glyph name="scissors" class="text-primary-500" />Cut line
				</div>
			</div>
		</div>

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
				<tr class="border-t-2 border-surface-400 font-semibold dark:border-surface-600">
					<td class="py-1 pr-3 font-mono tabular-nums whitespace-nowrap">{fmt(cutLine, measurements.unit)}</td>
					<td class="flex items-center gap-1.5 py-1"
						><Glyph name="scissors" class="text-primary-500" />Cut line — trim everything below ({fmt(
							fabricBelow,
							measurements.unit,
						)} of fabric below the finished length)</td
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
