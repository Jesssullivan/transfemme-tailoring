<script lang="ts">
	import { base } from '$app/paths';

	const routes = [
		{
			href: `${base}/machine`,
			title: 'Machine setup & restoration',
			blurb:
				'The 6600C workhorse for wool and shirting; the corrected tension rule; and the 1800s treadle restoration log.',
		},
		{
			href: `${base}/tools`,
			title: 'Tools & BOM',
			blurb:
				'What I own (and the two mismatches to work around), what to buy, and why a real iron is the priority purchase.',
		},
		{
			href: `${base}/fitting`,
			title: 'Fitting theory & calculators',
			blurb:
				'Why a feminine fit differs, how an athletic build changes the advice, and five interactive alteration calculators.',
		},
		{
			href: `${base}/pants`,
			title: 'Dress pants',
			blurb: 'Suppress the waist, taper from the knee down only, re-hem to a flattering break.',
		},
		{
			href: `${base}/shirts`,
			title: 'Dress shirts',
			blurb: 'Two back darts + curved sides for an X-line; a one-pass sleeve; keep chest and reach room.',
		},
		{
			href: `${base}/vests`,
			title: 'Vests / waistcoats',
			blurb: 'The best first structured project: a concave hourglass curve and a front contour dart.',
		},
		{
			href: `${base}/coats`,
			title: 'Suit coats',
			blurb: 'The hard one. A real DIY scope, done in order — and an honest line for what wants a pro.',
		},
	];
</script>

<svelte:head>
	<title>Transfemme Tailoring — refitting masc formalwear, in the open</title>
	<meta
		name="description"
		content="A first-person build log and interactive alteration calculators for converting oversized, masculine-cut formalwear into a well-fitted transfeminine silhouette for an athletic body."
	/>
</svelte:head>

<main>
	<header class="mx-auto max-w-3xl px-6 pt-12 pb-6">
		<p class="text-surface-500 m-0 text-sm">A build log</p>
		<h1 class="mt-2">Transfemme Tailoring</h1>
		<p class="text-surface-700-300 mt-4 max-w-2xl text-lg">
			Taking an inherited capsule of oversized, masculine-cut formalwear — two pairs of dress pants, two collared
			shirts, a few boxy vests, and two coats from three-piece suits — and refitting it, seam by seam, into clothes that
			actually read as <em>me</em>.
		</p>
	</header>

	<div class="prose mx-auto max-w-3xl px-6 pb-4">
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
		<h2 class="mb-4">Start here</h2>
		<div class="not-prose grid gap-4 sm:grid-cols-2">
			{#each routes as r (r.href)}
				<a
					href={r.href}
					class="card preset-outlined-surface-500 hover:preset-filled-surface-100-900 block p-4 transition-colors"
				>
					<h3 class="m-0 text-base font-semibold">{r.title}</h3>
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
			<p class="m-0 font-semibold">Before you cut anything</p>
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
