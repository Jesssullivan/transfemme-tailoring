<script lang="ts">
	import { base } from '$app/paths';
	import WaistTakeInDistributor from '$lib/components/calc/WaistTakeInDistributor.svelte';
	import TaperCalculator from '$lib/components/calc/TaperCalculator.svelte';
	import HemCuffMarker from '$lib/components/calc/HemCuffMarker.svelte';
	import SeamReserveCheck from '$lib/components/calc/SeamReserveCheck.svelte';
</script>

<svelte:head>
	<title>Dress pants — Transfemme Tailoring</title>
	<meta
		name="description"
		content="Feminizing dress pants on an athletic build: define the waist, taper the leg from the knee down only (preserving seat and quad), and re-hem to a flattering break."
	/>
</svelte:head>

<main class="prose mx-auto max-w-3xl px-6 py-10">
	<p class="text-surface-500 m-0 text-sm">Build log · dress pants · beginner–intermediate</p>
	<h1>Dress pants</h1>
	<p>
		The friendliest place to start, because almost everything is a long straight seam. The goal: define a higher waist,
		taper the leg to a cleaner line <em>without</em> strangling an athletic quad or seat, and re-hem to a break that just
		kisses the shoe.
	</p>

	<h2 id="machine">Set up the machine</h2>
	<p>
		On the 6600C: a Universal <code>90/14</code> for medium wool, stitch length ~2.5–3.0&nbsp;mm. Swap to a Jeans/Denim
		or Topstitch needle for the stacked waistband and seat intersections — needle size, not just patience, is what stops
		you snapping a fine needle through four to six layers. (The <a href="{base}/machine">restored treadle</a> does these straight
		seams beautifully too; it just can't machine-finish the raw edges.)
	</p>

	<h2 id="tools">Assemble the tools</h2>
	<p>
		Bent shears, a seam ripper, tailor's chalk, fine pins, a tape measure and seam gauge — and the
		<a href="{base}/tools">pressing kit</a>: a ham for the curved seat and crotch seams, a clapper for the leg crease,
		and a press cloth (essential on cheap poly/poly-wool dress fabric, which scorches and goes shiny under a bare iron).
		Pressing gear is the priority purchase here.
	</p>

	<h2 id="steps">The stepwise guide</h2>
	<ol>
		<li>
			<strong>Preshrink — but read the care label first.</strong> Poly or poly-blend: wash and tumble on LOW is fine.
			Wool, wool-blend, silk, or "dry clean only": do <strong>not</strong> wash or tumble-dry (it felts and distorts the cloth,
			permanently). Preshrink those by hovering/pressing steam under a press cloth — you'll dry-clean them anyway.
		</li>
		<li>
			<strong>Fit inside-out</strong> over the exact underwear/shapewear you'll wear. Note the excess at waist, seat, thigh,
			knee and hem; pin the finished length at the shoe.
		</li>
		<li>
			<strong>Pin along the inseam and outseam <em>seam lines</em></strong> — not the pressed centerline leg crease (that's
			the line you protect and re-press last). Take a waist reduction of 2&nbsp;in or less entirely at the center-back seam;
			split anything over 2&nbsp;in between the CB and the two side seams so the seat stays on-grain.
		</li>
		<li>
			<strong>Chalk the new lines on one leg</strong>, true them with a ruler/curve, then copy onto the second leg so
			both match exactly.
		</li>
		<li>
			<strong>Baste and do the athlete test:</strong> sit, deep-squat, lunge and walk. Adjust until it skims without straining
			at quad or seat.
		</li>
		<li>
			<strong>Sew the new seam just inside the old stitching</strong>, tapering out to nothing. Crucially, taper
			<strong>only knee-to-hem</strong>: the new seam should hug the original line through the seat
			<em>and the entire thigh</em>
			(removing essentially nothing) and only begin diverging at or just below the knee. If the thigh is tight after the waist
			take-in, let the inseam <em>out</em> near the crotch rather than chasing a skinny leg.
		</li>
		<li>
			<strong>Take in the center-back waistband:</strong> open the CB, take in the seam by your marked amount, restitch the
			band, reattach the belt loops.
		</li>
		<li>
			<strong>Fit again, then trim</strong> the seam allowance to ~1/2–3/4&nbsp;in — only after the fit is confirmed.
			Finish the raw edges with pinking shears / a pinking-blade rotary, turn-and-stitch, a mock flat-fell, or a hand
			overcast (not a from-scratch French seam on an already-sewn seam), and press dress-trouser inseams <em>open</em>.
		</li>
		<li>
			<strong>Re-hem</strong> with the calculator below, then hand slip/catch-stitch the hem invisibly (the 6600C's machine
			blind hem is fine for casual trousers). Press as you go — ham, clapper, press cloth — and re-press the leg crease last.
		</li>
	</ol>

	<h3 id="calc-waist">Distribute the waist take-in</h3>
	<WaistTakeInDistributor />

	<h3 id="calc-taper">Taper the leg (knee-down only)</h3>
	<p class="text-sm">
		Set the upper point to your fullest thigh/knee and keep its target equal to the current value so the offset there
		stays ~0 — the slim comes from the lower leg.
	</p>
	<TaperCalculator />

	<h3 id="calc-hem">Mark the hem</h3>
	<HemCuffMarker />

	<h3 id="calc-reserve">Check you have the width before cutting</h3>
	<SeamReserveCheck />

	<hr />
	<p class="text-sm">
		More guides: <a href="{base}/shirts">shirts</a>, <a href="{base}/vests">vests</a>,
		<a href="{base}/coats">coats</a> · the <a href="{base}/fitting">fitting theory</a>.
	</p>
</main>
