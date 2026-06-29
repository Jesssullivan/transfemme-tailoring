<script lang="ts">
	import { base } from '$app/paths';
	import WaistTakeInDistributor from '$lib/components/calc/WaistTakeInDistributor.svelte';
	import DartBuilder from '$lib/components/calc/DartBuilder.svelte';
	import TaperCalculator from '$lib/components/calc/TaperCalculator.svelte';
	import SeamReserveCheck from '$lib/components/calc/SeamReserveCheck.svelte';
</script>

<svelte:head>
	<title>Dress shirts — Transfemme Tailoring</title>
	<meta
		name="description"
		content="Feminizing a boxy dress shirt: build an X-line with two back waist darts and curved side seams, add optional bust shaping, slim the sleeve elbow-to-cuff, and keep chest and reach room on a broad-shouldered athletic frame."
	/>
</svelte:head>

<main class="prose mx-auto max-w-3xl px-6 py-10">
	<p class="text-surface-500 m-0 text-sm">Build log · dress shirts · intermediate</p>
	<h1>Dress shirts</h1>
	<p>
		The masc-to-femme conversion that gives the most for the least: two back waist darts and a curved side seam turn a
		boxy column into an X-line. The whole trick is to put the shaping at the
		<strong>waist</strong> and leave the chest, back and armhole alone, so you read feminine without gaping buttons or restricted
		reach.
	</p>

	<h2 id="machine">Set up the machine</h2>
	<p>
		On the 6600C: a Microtex/Sharp <code>70/10</code>–<code>80/12</code> with a 50&nbsp;wt thread, stitch length ~2.0–2.5&nbsp;mm.
		Thin shirting feeds beautifully. A refit normally leaves the existing buttonholes untouched, so you don't even need the
		buttonholer here.
	</p>

	<h2 id="tools">Assemble the tools</h2>
	<p>
		Fine 0.5&nbsp;mm glass-head pins (<em>not</em> the 2″ T-pins — they leave holes in shirting), tailor's chalk, snips,
		and a <a href="{base}/tools">ham + press cloth</a> for the darts. A sleeve board helps but is optional.
	</p>

	<h2 id="steps">The stepwise guide</h2>
	<ol>
		<li>
			<strong>Preshrink to the care label</strong> (cotton: wash/tumble; wool or silk: steam, never tumble-dry), press flat,
			then try on inside-out over the bra/forms you'll actually wear, buttoned.
		</li>
		<li>
			<strong>Plan the suppression at the waist:</strong> two vertical back waist darts (~0.75&nbsp;in each to start)
			plus a curved side seam. Do <strong>not</strong> over-slim the chest or upper back — that's what causes button gape
			and a shirt you can't reach in.
		</li>
		<li>
			<strong>Diagnose any front placket gape first.</strong> A dart adds <em>shape</em>, not girth. If the fronts pull
			apart because the chest-plus-forms is now bigger than the shirt, you need more circumference — let the side seams
			out over the chest, or size up. Use a small side-bust dart
			<em>only</em> where there's excess fabric collapsing over the apex.
		</li>
		<li><strong>Mark, true, and mirror</strong> left to right; baste and re-fit with the reach / cross-arm test.</li>
		<li>
			<strong>Sew the darts first</strong>, each from the wide middle out to the point, sewing off the fold into a
			thread tail — then <strong>hand-tie the tails</strong>. Never backtack or pivot-lock a dart tip; it dimples the
			line permanently. Press the darts over a ham (back darts toward center-back, any bust dart downward).
		</li>
		<li>
			<strong>Sew the side + underarm sleeve seam in one continuous pass</strong>, tapering back into the original seam
			at each end.
		</li>
		<li>
			<strong>Taper the sleeve elbow-to-cuff only</strong>, keeping full bicep ease. Shorten sleeves from the
			<em>cuff</em> end (detach cuff, trim, restore the pleats, reattach) — never from the shoulder.
		</li>
		<li>
			<strong>Finish the raw edges</strong> (a flat-fell or French seam only if you're matching the shirt's original from-scratch
			construction; otherwise pink / turn-and-stitch / hand overcast), trim after the fit is confirmed, topstitch anything
			the original shirt topstitches, and press.
		</li>
	</ol>

	<h3 id="calc-waist">Distribute the suppression</h3>
	<WaistTakeInDistributor />

	<h3 id="calc-dart">Lay out the back darts</h3>
	<p class="text-sm">A shirt has no waist seam, so these are double-pointed contour (fish-eye) darts.</p>
	<DartBuilder />

	<h3 id="calc-taper">Taper the sleeve (elbow-down)</h3>
	<TaperCalculator />

	<h3 id="calc-reserve">Confirm the width before cutting</h3>
	<SeamReserveCheck />

	<hr />
	<p class="text-sm">
		More guides: <a href="{base}/pants">pants</a>, <a href="{base}/vests">vests</a>,
		<a href="{base}/coats">coats</a> · the <a href="{base}/fitting">fitting theory</a>.
	</p>
</main>
