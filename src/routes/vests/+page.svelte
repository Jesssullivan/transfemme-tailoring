<script lang="ts">
	import { base } from '$app/paths';
	import WaistTakeInDistributor from '$lib/components/calc/WaistTakeInDistributor.svelte';
	import DartBuilder from '$lib/components/calc/DartBuilder.svelte';
	import SeamReserveCheck from '$lib/components/calc/SeamReserveCheck.svelte';
</script>

<svelte:head>
	<title>Vests / waistcoats — Transfemme Tailoring</title>
	<meta
		name="description"
		content="Converting a boxy masc waistcoat to a fitted feminine vest: replace straight sides with a concave hourglass curve, add a front contour dart, raise the waist, and let the back buckle do much of the work."
	/>
</svelte:head>

<main class="prose mx-auto max-w-3xl px-6 py-10">
	<p class="text-surface-500 m-0 text-sm">Build log · vests · beginner–intermediate</p>
	<h1>Vests / waistcoats</h1>
	<p>
		The best first structured-tailoring project — mostly straight and gently-curved seams, plus a back buckle that does
		a lot of the waist work for free. Learn the moves here before you touch a jacket.
	</p>

	<h2 id="machine">Set up the machine</h2>
	<p>
		Straight stitch ~2.5–3&nbsp;mm for wool on the 6600C (or the <a href="{base}/machine">treadle</a>, whose straight
		seam this suits perfectly). Lock straight seam ends as usual — but always stitch a
		<strong>dart tip off to nothing and hand-tie it</strong>, never backtack, or you'll dimple the front.
	</p>

	<h2 id="tools">Assemble the tools</h2>
	<p>
		Shears, seam rippers, a <a href="{base}/tools">ham, clapper and press cloth</a>, and a fray-resist edge plan for raw
		worsted: pinking <em>shears</em> or a pinking-<em>blade</em> rotary head, or a hand overcast or Hong-Kong bind. (A plain
		straight rotary blade does not pink — it leaves a straight edge that still frays.)
	</p>

	<h2 id="steps">The stepwise guide</h2>
	<ol>
		<li>
			<strong>Fit inside-out</strong> and buckle it to where it will actually sit. Pin each side seam to a smooth concave
			(hourglass) line — deepest at the waist, tapering to nothing at the underarm and near the hem.
		</li>
		<li>
			<strong>Take the width out at the side seams</strong> (they sit under the arm, over the lats),
			<em>not</em> by over-cinching the back buckle — yanking the buckle creates horizontal drag lines and reads pulled and
			masc. Set the buckle first, take the rest off the two sides, and only take in the center-back seam if it's still boxy.
		</li>
		<li>
			<strong>Open just enough</strong> lining/hem at the side seams to work. Re-mark the curved line and
			<strong>mirror both sides</strong> from center front at three or four heights so the curves match.
		</li>
		<li>
			<strong>Sew the sides as separate passes</strong> — shell-to-shell, then lining-to-lining — on the lined
			<em>front</em>
			panels, so the lower-ease lining doesn't pucker the shell. (Many traditional waistcoats have a single-layer lining/silesia
			<em>back</em> carrying the buckle, so check your vest's back construction before you unpick.)
		</li>
		<li>
			<strong>Add a vertical front contour dart</strong> on each front, pointing toward the bust — the single biggest feminine
			win. Place it so the side-curve apex and the dart tips land at your true (higher) waist.
		</li>
		<li><strong>Baste and fit before trimming;</strong> then clip the concave waist curve so it presses flat.</li>
		<li>
			<strong>V &amp; buttons:</strong> keep the V narrow and vertical and raise the waist/button stance to the true
			waist (a slightly <em>longer</em>, not higher, V is what elongates the torso). New buttonholes are hand-worked or
			made on the 6600C; or relocate the buttons to reuse the existing holes, or hide snaps behind decorative buttons.
		</li>
		<li>
			<strong>Re-anchor the buckle</strong> if you took the center-back in, re-close the lining and hem by hand (slip-stitch),
			and give it a final press over a ham, set with a clapper, press cloth always, wool heat ~150&nbsp;°C / 300&nbsp;°F.
		</li>
	</ol>

	<h3 id="calc-waist">Distribute the take-in</h3>
	<WaistTakeInDistributor />

	<h3 id="calc-dart">Build the front contour dart</h3>
	<DartBuilder />

	<h3 id="calc-reserve">Check the reserve before cutting</h3>
	<SeamReserveCheck />

	<hr />
	<p class="text-sm">
		More guides: <a href="{base}/pants">pants</a>, <a href="{base}/shirts">shirts</a>,
		<a href="{base}/coats">coats</a> · the <a href="{base}/fitting">fitting theory</a>.
	</p>
</main>
