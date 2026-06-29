<script lang="ts">
	// Pull-up "My measurements" drawer — the handful of body numbers you reach
	// for mid-alteration, reachable from any page. Reads/writes the shared
	// measurements store (the full editor lives at /measurements).
	import { base } from '$app/paths';
	import { Dialog } from '@skeletonlabs/skeleton-svelte';
	import { Ruler, X } from '@lucide/svelte';
	import { measurements, type BodyProfile } from '$lib/calc/measurements.svelte';

	let open = $state(false);

	const QUICK: { key: keyof BodyProfile; label: string }[] = [
		{ key: 'waist', label: 'Natural waist' },
		{ key: 'hip', label: 'Hip / seat' },
		{ key: 'fullBust', label: 'Full bust' },
		{ key: 'bicepFlexed', label: 'Bicep (flexed)' },
		{ key: 'thigh', label: 'Thigh' },
		{ key: 'knee', label: 'Knee' },
		{ key: 'ankle', label: 'Ankle / hem' },
	];
</script>

<Dialog {open} onOpenChange={(d) => (open = d.open)} closeOnInteractOutside closeOnEscape preventScroll>
	<Dialog.Trigger class="hover:bg-surface-200-800 rounded p-2" aria-label="My measurements">
		<Ruler class="h-5 w-5" />
	</Dialog.Trigger>
	<Dialog.Backdrop class="fixed inset-0 z-40 bg-black/40" />
	<Dialog.Positioner class="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[88vw]">
		<Dialog.Content class="bg-surface-50-950 flex w-full flex-col">
			<div class="border-surface-200-800 flex items-center justify-between border-b px-4 py-3">
				<span class="font-semibold">My measurements</span>
				<Dialog.CloseTrigger class="hover:bg-surface-200-800 rounded p-2" aria-label="Close">
					<X class="h-5 w-5" />
				</Dialog.CloseTrigger>
			</div>
			<div class="flex flex-col gap-3 overflow-y-auto p-4 text-sm">
				<div class="flex items-center gap-1" role="group" aria-label="Working unit">
					<span class="text-surface-600 dark:text-surface-400 mr-1">Unit</span>
					{#each ['cm', 'in'] as u (u)}
						<button
							type="button"
							class="badge {measurements.unit === u ? 'preset-filled-primary-500' : 'preset-outlined-surface-500'}"
							aria-pressed={measurements.unit === u}
							onclick={() => measurements.setUnit(u as 'cm' | 'in')}>{u}</button
						>
					{/each}
				</div>
				{#each QUICK as q (q.key)}
					<label class="flex items-center justify-between gap-2">
						<span class="text-surface-600 dark:text-surface-400">{q.label}</span>
						<span class="flex items-center gap-1">
							<input
								class="input w-24 text-right font-mono tabular-nums"
								type="number"
								step="0.5"
								min="0"
								bind:value={measurements.body[q.key]}
							/>
							<span class="text-surface-500 w-5 text-xs">{measurements.unit}</span>
						</span>
					</label>
				{/each}
				<a href="{base}/measurements" class="text-primary-500 hover:underline" onclick={() => (open = false)}>
					Full measurement profile →
				</a>
				<p class="text-surface-500 text-xs">Saved on this device only — nothing is uploaded.</p>
			</div>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog>
