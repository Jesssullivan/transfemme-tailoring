<script lang="ts">
	import { base } from '$app/paths';
	import WaistTakeInDistributor from '$lib/components/calc/WaistTakeInDistributor.svelte';
	import DartBuilder from '$lib/components/calc/DartBuilder.svelte';
	import TaperCalculator from '$lib/components/calc/TaperCalculator.svelte';
	import HemCuffMarker from '$lib/components/calc/HemCuffMarker.svelte';
	import SeamReserveCheck from '$lib/components/calc/SeamReserveCheck.svelte';
</script>

<svelte:head>
	<title>Suit coats — Transfemme Tailoring</title>
	<meta
		name="description"
		content="The hardest job: refitting an oversized masc suit coat toward a softer, waisted feminine silhouette. A real DIY scope (center-back/side take-in, sleeve taper and shortening, shoulder-pad softening, hem) done in strict order — and an honest line for what wants a professional."
	/>
</svelte:head>

<main class="prose mx-auto max-w-3xl px-6 py-10">
	<p class="text-surface-500 m-0 text-sm">Build log · suit coats · advanced</p>
	<h1>Suit coats</h1>
	<p>
		The hardest piece in the capsule, and the last one to cut. There's a real, satisfying DIY scope — but a structured
		jacket also has a line past which home work ruins it. Do the lower-stakes garments first; treat the two coats as
		graduation projects.
	</p>

	<div class="card preset-outlined-warning-500 not-prose my-5 p-4 text-sm">
		<p class="m-0 font-semibold">Know the line</p>
		<p class="m-0 mt-2">
			<strong>DIY-feasible:</strong> taking in the center-back, side-back and side seams; tapering the under-sleeve; shortening
			sleeves and body; softening the shoulder by skiving or removing pads; closing a small collar gap.
		</p>
		<p class="m-0 mt-2">
			<strong>The pro line — don't attempt at home:</strong> full canvas / chest-piece reshaping and lapel-roll
			re-padding, re-cutting the armhole (armscye), and true shoulder-<em>width</em>
			reduction (re-setting the sleeve cap). High failure risk; hand these off.
		</p>
	</div>

	<h2 id="machine">Set up the machine</h2>
	<p>
		The 6600C (or the <a href="{base}/machine">treadle</a>) handles the straight and gently-curved seams: center-back,
		side-back, side, and the under-sleeve taper. The pads, collar, lining, sleeve-cap easing and any buttonholes are
		hand work. Test heat on a hidden spot first — cheap
		<strong>fused</strong> jackets bubble and delaminate under too much heat.
	</p>

	<h2 id="tools">Assemble the tools</h2>
	<p>
		The full <a href="{base}/tools">pressing kit</a> is non-negotiable here: ham, clapper, sleeve roll, press cloth. Plus
		shears, seam rippers, fine and heavy needles, and twill/stay tape to hold the new waist and shoulder seams.
	</p>

	<h2 id="steps">The stepwise guide — order matters</h2>
	<ol>
		<li>
			<strong>Diagnose on the body or form</strong>, jacket buttoned. Pin the center-back, side-back and side seams to a
			curved waist line; mark sleeve length and taper, hem, and any collar gap. Photograph front/back/side. This is the
			measure-twice step.
		</li>
		<li>
			<strong>Open the lining at each seam you'll alter</strong> and take the <em>same</em> amount out of the lining in parallel
			— alter only the shell and the lining bubbles. You'll re-close it later by bagging where reachable or hand-felling the
			final opening.
		</li>
		<li>
			<strong>Take the center-back seam first</strong> — a curved line, deepest at the waist, blending to nothing before
			the collar and the vent. Keep the vent and <em>re-balance</em> it rather than deleting it (deleting removes sitting
			and stride ease and can pull across the seat).
		</li>
		<li>
			<strong>Then the mirrored side-back and side seams.</strong> Put most of the take-in at the side-back/back, keep suppression
			low, and keep the shoulder-blade and armhole area roomy so the athletic back isn't choked and the jacket doesn't ride
			up.
		</li>
		<li>
			<strong>Press every vertical seam over the ham + clapper and re-evaluate.</strong> Lock the torso fit before you touch
			the sleeves.
		</li>
		<li>
			<strong>Soften the shoulders:</strong> default to skiving the pad thinner or swapping a thin sleeve-head roll, to keep
			a soft supported roll. Reserve full pad removal for square or bony athletic shoulders. After any change, take a little
			up at the shoulder seam and re-press the cap softly over a roll.
		</li>
		<li>
			<strong>Sleeves:</strong> shorten from the cuff if the cuff buttons are decorative (else from the head, only ~2.5–4&nbsp;cm);
			taper from the hidden under-sleeve seam, keeping flexed-bicep ease.
		</li>
		<li>
			<strong>Hem the body</strong> (hand-finished at the lining turn), optionally close the collar, re-line by hand, and
			do a final press — sleeve heads softly over a roll, never a hard crease into the cap. Wool: press cloth always, ~150&nbsp;°C
			/ 300&nbsp;°F with steam, lift-and-lower.
		</li>
	</ol>

	<h3 id="calc-waist">Distribute the take-in (back-loaded)</h3>
	<WaistTakeInDistributor />

	<h3 id="calc-dart">Add a back waist dart if needed</h3>
	<DartBuilder />

	<h3 id="calc-taper">Taper the under-sleeve</h3>
	<TaperCalculator />

	<h3 id="calc-hem">Mark the sleeve / body length</h3>
	<HemCuffMarker />

	<h3 id="calc-reserve">Check the reserve before cutting</h3>
	<SeamReserveCheck />

	<hr />
	<p class="text-sm">
		More guides: <a href="{base}/pants">pants</a>, <a href="{base}/shirts">shirts</a>,
		<a href="{base}/vests">vests</a> · the <a href="{base}/fitting">fitting theory</a>.
	</p>
</main>
