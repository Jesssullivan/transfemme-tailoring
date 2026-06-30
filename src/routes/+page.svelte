<script lang="ts">
	import { base } from '$app/paths';
	import Glyph from '$lib/components/Glyph.svelte';
	import DartDiagram from '$lib/components/diagrams/DartDiagram.svelte';

	const routes = [
		{
			href: `${base}/machine`,
			icon: 'cog',
			title: 'Machine setup & restoration',
			blurb:
				'The 6600C workhorse for wool and shirting; the corrected tension rule; and the 1800s treadle restoration log.',
		},
		{
			href: `${base}/tools`,
			icon: 'wrench',
			title: 'Tools & BOM',
			blurb:
				'What I own (and the two mismatches to work around), what to buy, and why a real iron is the priority purchase.',
		},
		{
			href: `${base}/fitting`,
			icon: 'calculator',
			title: 'Fitting theory & calculators',
			blurb:
				'Why a feminine fit differs, how an athletic build changes the advice, and five interactive alteration calculators.',
		},
		{
			href: `${base}/pants`,
			icon: 'scissors',
			title: 'Dress pants',
			blurb: 'Suppress the waist, taper from the knee down only, re-hem to a flattering break.',
		},
		{
			href: `${base}/shirts`,
			icon: 'scissors',
			title: 'Dress shirts',
			blurb: 'Two back darts + curved sides for an X-line; a one-pass sleeve; keep chest and reach room.',
		},
		{
			href: `${base}/vests`,
			icon: 'scissors',
			title: 'Vests / waistcoats',
			blurb: 'The best first structured project: a concave hourglass curve and a front contour dart.',
		},
		{
			href: `${base}/coats`,
			icon: 'scissors',
			title: 'Suit coats',
			blurb: 'The hard one. A real DIY scope, done in order — and an honest line for what wants a pro.',
		},
	] as const;
</script>

<svelte:head>
	<title>Transfemme Tailoring — refitting masc formalwear, in the open</title>
	<meta
		name="description"
		content="A first-person build log and interactive alteration calculators for converting oversized, masculine-cut formalwear into a well-fitted transfeminine silhouette for an athletic body."
	/>
</svelte:head>

<main>
	<header class="relative overflow-hidden border-b border-surface-200-800">
		<div
			class="pointer-events-none absolute inset-0 -z-10"
			aria-hidden="true"
			style="background-image: radial-gradient(ellipse 80% 70% at 78% -10%, color-mix(in oklch, var(--color-primary-500) 14%, transparent), transparent 65%);"
		></div>
		<div class="mx-auto grid max-w-5xl gap-8 px-6 pt-16 pb-12 md:grid-cols-[1fr_auto] md:items-center">
			<div class="max-w-2xl">
				<p class="m-0 text-xs font-semibold tracking-widest text-primary-700 uppercase dark:text-primary-300">
					A build log
				</p>
				<h1 class="mt-3 text-balance">Transfemme Tailoring</h1>
				<p class="text-surface-700-300 mt-4 text-lg text-pretty">
					Taking an inherited capsule of oversized, masculine-cut formalwear — two pairs of dress pants, two collared
					shirts, a few boxy vests, and two coats from three-piece suits — and refitting it, seam by seam, into clothes
					that actually read as <em>me</em>.
				</p>
				<div class="not-prose mt-6 flex flex-wrap gap-3">
					<a
						class="btn preset-filled-primary-500 inline-flex min-h-11 items-center gap-2"
						href="{base}/fitting#calculators"
					>
						<Glyph name="calculator" />Open the calculators
					</a>
					<a class="btn preset-outlined-surface-500 inline-flex min-h-11 items-center gap-2" href="{base}/machine">
						<Glyph name="cog" />Start at the machine
					</a>
				</div>
			</div>
			<div class="hidden text-primary-500 md:block md:w-56" aria-hidden="true">
				<DartDiagram />
			</div>
		</div>
	</header>

	<div class="prose mx-auto max-w-3xl px-6 pt-8 pb-4">
		<p>
			This is a learning notebook, not a tailoring authority. I'm writing down what I figure out as I figure it out,
			with the sources I checked and the math I use, so the next transfemme person staring at a too-big jacket has
			somewhere to start. Everything here is reversible until you cut — so the cardinal rule is <strong
				>baste and fit before you ever take the scissors to wool.</strong
			>
		</p>

		<h2>Two machines, one of them aspirational</h2>
		<p>
			The machine I actually sew on is a modern computerized <strong>SINGER 6600C</strong>: it does the buttonholes, the
			zigzag edge-finishing, the stretch stitches for linings, and it powers through stacked wool. The
			<strong>1800s treadle Singer</strong>
			in the corner is a restoration project — not yet a working machine — that will someday lay down the prettiest straight
			construction seam in the house. The guides assume the 6600C; the treadle gets its own
			<a href="{base}/machine#treadle">restoration log</a>.
		</p>

		<h2>The thesis</h2>
		<p>
			Two ideas do most of the work on every page. First: <strong
				>most of the feminine shape is built with the iron, not the needle</strong
			>
			— pressing a curve into wool over a ham is what separates a tailored result from a homemade one. Second: you make an
			athletic frame read as an hourglass by <strong>maximizing waist contrast</strong>, not by shrinking load-bearing
			shoulders. You usually can't narrow broad shoulders on existing menswear, so you suppress the waist hard, keep
			ease over the muscle, and let the hip balance the frame.
		</p>
	</div>

	<section class="mx-auto max-w-3xl px-6 py-4">
		<p class="m-0 text-xs font-semibold tracking-widest text-primary-700 uppercase dark:text-primary-300">The map</p>
		<h2 class="mt-1 mb-4">Start here</h2>
		<div class="not-prose grid gap-4 sm:grid-cols-2">
			{#each routes as r (r.href)}
				<a
					href={r.href}
					class="card preset-outlined-surface-500 hover:preset-filled-surface-100-900 block border-t-2 border-t-primary-500/40 p-4 transition-colors"
				>
					<h3 class="m-0 flex items-center gap-2 text-base font-semibold">
						<Glyph name={r.icon} class="text-primary-500" />{r.title}
					</h3>
					<p class="text-surface-600 dark:text-surface-400 m-0 mt-1 text-sm">{r.blurb}</p>
				</a>
			{/each}
		</div>
		<p class="text-surface-500 mt-4 text-sm">
			Every garment guide follows the same shape: <strong
				>set up the machine → assemble the tools → the stepwise guide</strong
			>, with the calculators from
			<a class="underline" href="{base}/fitting">Fitting</a> embedded where you need them.
		</p>
	</section>

	<aside class="mx-auto max-w-3xl px-6 py-6">
		<div class="card preset-outlined-warning-500 not-prose p-4 text-sm">
			<p class="m-0 flex items-center gap-2 font-semibold">
				<Glyph name="triangle-exclamation" class="text-warning-600 dark:text-warning-400" />Before you cut anything
			</p>
			<ul class="mt-2 mb-0 list-disc space-y-1 pl-5">
				<li>
					Check the care label and match preshrinking to it — wool and dry-clean-only fabrics get
					<strong>steam</strong>, never a tumble-dryer (it felts them, irreversibly).
				</li>
				<li>
					Baste the new seams and fit on your body (or a padded form) <em>before</em> any final stitching; trim the seam allowance
					only after the fit is locked.
				</li>
				<li>
					This is experimental and personal — verify against the linked sources and your own garment before committing.
				</li>
			</ul>
		</div>
	</aside>
</main>
