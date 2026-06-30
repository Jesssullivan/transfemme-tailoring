<script lang="ts">
	import { base } from '$app/paths';
	import { measurements, BODY_FIELDS } from '$lib/calc/measurements.svelte';
	import Glyph from '$lib/components/Glyph.svelte';

	const GROUPS = [
		{ id: 'torso', label: 'Torso' },
		{ id: 'arm', label: 'Arms' },
		{ id: 'leg', label: 'Legs' },
		{ id: 'length', label: 'Finished lengths' },
	] as const;

	let importError = $state('');

	function doExport() {
		const blob = new Blob([measurements.exportJSON()], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'my-measurements.json';
		a.click();
		URL.revokeObjectURL(url);
	}

	async function doImport(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		const text = await file.text();
		importError = measurements.importJSON(text) ? '' : 'Could not read that file — is it a measurements export?';
		input.value = '';
	}

	function doReset() {
		if (confirm('Clear all your saved measurements? This cannot be undone.')) measurements.reset();
	}
</script>

<svelte:head>
	<title>My measurements — Transfemme Tailoring</title>
	<meta
		name="description"
		content="Enter your body and garment-flat measurements once; every alteration calculator reads them, and they're saved privately in your browser (with JSON export/import) so live tailoring needs no rebuild."
	/>
</svelte:head>

<main class="prose mx-auto max-w-3xl px-6 py-10">
	<p class="text-surface-500 m-0 text-sm">Build log · your profile</p>
	<h1>My measurements</h1>
	<p>
		Enter your measurements once — every calculator on the site reads them, and they're saved in
		<strong>this browser only</strong> (nothing is uploaded). Numbers are in your chosen unit; toggling converts them.
		Not sure what to measure? See the
		<a href="{base}/fitting#measurements">measurement guide</a>.
	</p>

	<p class="not-prose text-surface-500 flex items-center gap-1.5 text-xs">
		<Glyph name="lock" class="text-primary-500" />Device-local &amp; private — use Export below to keep a portable
		backup.
	</p>

	<div class="card preset-outlined-surface-500 not-prose my-5 flex flex-wrap items-center gap-3 p-4 text-sm">
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
		<div class="flex-1"></div>
		<button type="button" class="btn preset-outlined-surface-500 text-sm" onclick={doExport}>Export JSON</button>
		<label class="btn preset-outlined-surface-500 cursor-pointer text-sm">
			Import JSON
			<input type="file" accept="application/json,.json" class="sr-only" onchange={doImport} />
		</label>
		<button type="button" class="btn preset-outlined-error-500 text-sm" onclick={doReset}>Reset</button>
	</div>
	{#if importError}
		<p class="text-error-700 dark:text-error-300 not-prose text-sm">{importError}</p>
	{/if}

	{#each GROUPS as group (group.id)}
		<h2>{group.label}</h2>
		<div class="not-prose my-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
			{#each BODY_FIELDS.filter((f) => f.group === group.id) as field (field.key)}
				<label class="flex flex-col gap-1 text-sm">
					<span class="text-surface-600 dark:text-surface-400">{field.label}</span>
					<span class="flex items-center gap-1">
						<input
							class="input font-mono tabular-nums"
							type="number"
							step="0.5"
							min="0"
							bind:value={measurements.body[field.key]}
						/>
						<span class="text-surface-500 w-5 text-xs">{measurements.unit}</span>
					</span>
				</label>
			{/each}
		</div>
	{/each}

	<p class="text-surface-500 text-sm">
		Garment-flat measurements (what you measure off each specific garment) are saved automatically as you use the
		calculators on each garment page.
	</p>

	<hr />
	<p class="text-sm">
		Now put them to work: <a href="{base}/fitting">fitting &amp; calculators</a>,
		<a href="{base}/pants">pants</a>, <a href="{base}/shirts">shirts</a>,
		<a href="{base}/vests">vests</a>, <a href="{base}/coats">coats</a>.
	</p>
</main>
