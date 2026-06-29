<script lang="ts">
	import { base } from '$app/paths';
	import WaistTakeInDistributor from '$lib/components/calc/WaistTakeInDistributor.svelte';
	import DartBuilder from '$lib/components/calc/DartBuilder.svelte';
	import TaperCalculator from '$lib/components/calc/TaperCalculator.svelte';
	import HemCuffMarker from '$lib/components/calc/HemCuffMarker.svelte';
	import SeamReserveCheck from '$lib/components/calc/SeamReserveCheck.svelte';
</script>

<svelte:head>
	<title>Fitting theory &amp; calculators — Transfemme Tailoring</title>
	<meta
		name="description"
		content="Why a feminine fit differs from menswear, how an athletic build changes the advice, the waist-suppression distribution math, pressing and interfacing fundamentals, the measurements to take, and five interactive alteration calculators."
	/>
</svelte:head>

<main class="prose mx-auto max-w-3xl px-6 py-10">
	<p class="text-surface-500 m-0 text-sm">Build log · the reasoning</p>
	<h1>Fitting theory &amp; measurements</h1>
	<p>
		Everything else on the site is a recipe; this page is the <em>why</em>. It's also where the five calculators live in
		full — the garment guides just embed the ones they need.
	</p>

	<h2 id="feminine-fit">What makes a fit read feminine</h2>
	<p>
		A women's block carries more total <strong>waist suppression</strong> than a men's, and it puts the narrowest point
		higher and curves it more sharply, so the eye reads an hourglass. Menswear builds in only mild waist shaping even on
		a body with a 15–20&nbsp;cm chest-to-waist difference (and men's shirts are cut nearly straight); the single
		highest-leverage change is taking
		<em>in</em> at the waist, not letting out elsewhere. A few principles follow from that:
	</p>
	<ul>
		<li>
			Distribute suppression into <strong>vertical shaping lines</strong> — princess seams and front/back darts that curve
			continuously through the waist — not just the side seams.
		</li>
		<li>
			Aim for the proportion that reads feminine: <strong>waist ≈ 0.7 of hip</strong>, with the shoulder not
			dramatically wider than the hip.
		</li>
		<li>
			The armscye should be <strong>higher, smaller and closer-cut</strong>, with the side seam brought in toward the
			ribcage — <em>not</em> lowered. Deepening a finished armhole is irreversible and reads boxy; treat its depth as fixed
			and get the close fit from the side seam.
		</li>
		<li>
			Sleeves and legs are narrower and more tapered; overall wearing ease is reduced (1–2.5&nbsp;cm at the waist).
		</li>
		<li>
			A bust dart (or its equivalent ease) is what lets a flat front curve over a bra or forms while still nipping the
			waist.
		</li>
	</ul>

	<h2 id="athletic">Adjusting for an athletic build</h2>
	<p>
		Broad shoulders, back and lats; developed arms; muscular thighs and glutes; a less-defined waist; hips that read
		narrow relative to the shoulders. The standard advice needs these amendments:
	</p>
	<ul>
		<li>
			You usually <strong>can't narrow load-bearing shoulders</strong> — so manufacture the feminine ratio by
			<strong>maximizing waist contrast</strong>. Take the waist in hard and the shoulder-to-waist taper does the work
			narrowing can't.
		</li>
		<li>
			<strong>Back-load the suppression.</strong> The excess lives in the back, so put most of it in the center-back seam
			plus back waist darts (or a back princess seam); keep front shaping light so the closure lies flat.
		</li>
		<li>
			<strong>Clear the flexed bicep and thigh.</strong> Stop a sleeve taper above the bicep and slim only elbow-to-wrist;
			keep seat and thigh ease and taper trousers only from the knee down. Over-slimming muscle just makes drag wrinkles that
			read "tight on muscle."
		</li>
		<li>
			<strong>Keep or flare the hip.</strong> Because hips read narrow, don't taper jacket/shirt hems inward — let them skim
			or flare slightly to balance the shoulder.
		</li>
		<li>
			<strong>Treat worn forms/pads as body measurements:</strong> add their thickness to the target circumferences
			first, and get the room by adding/deepening a bust dart or letting out the side seams — <em>not</em> by flat-pattern
			slash-and-spread, which you can't do on a finished garment.
		</li>
	</ul>

	<h2 id="suppression-math">The suppression math</h2>
	<p>
		Total to remove at the waist = current garment waist − (target body waist + ease). Don't take it all from one place.
		A workable athletic split is <strong>center-back ~15–25%</strong>, <strong>two side seams ~25–35%</strong>, and
		<strong>darts ~45–60%</strong>, back-loaded. Then convert each share to a marking offset, remembering the geometry
		that trips everyone up:
	</p>
	<blockquote>
		A <strong>seam</strong> removes <strong>twice</strong> the offset you mark (it eats fabric off both panels meeting
		there). A <strong>dart</strong> removes <strong>exactly</strong> its pinched width.
	</blockquote>
	<p>
		So a center-back offset = (CB share)/2, each of two side seams is marked at (side share)/4, and a dart's width =
		(dart share)/number of darts. Keep any single dart at or below ~2.5–3&nbsp;cm — past that it points and puckers, so
		add a dart or move the surplus to a seam. The
		<strong>Waist take-in distributor</strong> below does all of this; hand its per-dart width to the
		<strong>Dart builder</strong>.
	</p>

	<h2 id="shoulder">Softening the shoulder</h2>
	<p>
		Masc formalwear builds the shoulder up and out with pads and a stiff sleeve-head roll. To soften toward feminine, <strong
			>default to skiving the pad thinner or swapping to a thin sleeve-head roll</strong
		>
		— that keeps a soft <em>supported</em> roll. Reserve full pad removal for square or bony athletic shoulders that
		have their own structure; on a canvassed or sloped shoulder, pulling all the loft can collapse the line and leave
		the cap puckering. After any change, take a little up at the shoulder seam and re-press the cap softly over a ham or
		roll — never crush a hard crease into it. True shoulder-<em>width</em> reduction means re-setting the sleeve and re-cutting
		the armhole; that's the pro line.
	</p>

	<h2 id="pressing">Pressing &amp; interfacing</h2>
	<p>
		<strong>Pressing</strong> (lift and lower with steam) is not <strong>ironing</strong> (sliding), and it's half the
		result. Press as you go — set and press every seam before you cross it, because once a seam is enclosed you can't
		fix it. For each seam: first <em>set the stitch</em> by pressing it flat as sewn, then press it open over a hard
		edge. Use a ham for every curve (darts, shoulders, the waist), a seam roll to avoid ridge imprints, and a clapper
		for crisp edges and creases. Wool wants moisture + heat + pressure: steam through a damp press cloth, set the
		clapper, and hold until cool — cooling-under-pressure is what makes the shape permanent. Always use a press cloth on
		wool/dark/fused fabric, and <strong>test heat on a hidden seam first</strong>:
	</p>
	<ul>
		<li><strong>Polyester / poly-blend:</strong> LOW, dry-ish heat under a cloth — it melts and glazes easily.</li>
		<li>
			<strong>Wool:</strong> moderate-hot (~150&nbsp;°C / 300&nbsp;°F) <em>with</em> steam and a cloth, lift-and-lower, then
			the clapper. Fused jackets: keep heat lower and test for bubbling.
		</li>
	</ul>
	<p>
		<strong>Interfacing</strong> re-supports collars, cuffs, plackets, lapels, waistbands and any new edge or buttonhole you
		add. Match its weight to the fabric or lighter; use fusible for shirting, sew-in for wool jackets and soft lapels you
		want to roll. Interface new edges and buttonhole areas — not the dart itself.
	</p>

	<h2 id="measurements">Measurements to take</h2>
	<p><strong>On the body</strong> (over the shapewear/forms you'll actually wear):</p>
	<ul>
		<li>Shoulder point-to-point, and across-back width (blade to blade) for lat fullness.</li>
		<li>
			Full bust/chest at the fullest point, high bust/upper chest (the number a jacket should be sized to), and
			underbust.
		</li>
		<li>
			Natural waist at the smallest point — and its height (nape-to-waist), so you can re-mark the waistline higher.
		</li>
		<li>High hip (~8&nbsp;cm below waist) and full hip/seat at the fullest.</li>
		<li>Bicep flexed <em>and</em> relaxed, wrist, arm length (shoulder→wrist and shoulder→elbow).</li>
		<li>
			Neck, shoulder slope; thigh/knee/calf/ankle; inseam, outseam, front &amp; back rise; and your desired finished
			lengths.
		</li>
	</ul>
	<p><strong>On the garment, flat</strong> (buttoned, then ×2 for circumference):</p>
	<ul>
		<li>Chest, waist and hip flat at marked levels; existing shoulder-seam length and current pad thickness.</li>
		<li>Sleeve flat width at the bicep line and the cuff; full sleeve length; existing cuff/hem depth.</li>
		<li>Side-seam length, armhole depth, and the existing seam allowance you could reclaim (peek inside).</li>
		<li>Trouser leg flat width at thigh/knee/hem; current inseam/outseam; existing hem allowance.</li>
		<li>Button stance, any existing darts and their positions; and the current finished length of every garment.</li>
	</ul>

	<h2 id="calculators">The calculators</h2>
	<p>
		All in centimetres (with an inch echo in the labels). Feed the <strong>Distributor</strong>
		first; hand its dart intake to the <strong>Dart builder</strong>; use the <strong>Taper</strong>
		for sleeves and legs and the <strong>Hem &amp; cuff marker</strong> for length; and run the
		<strong>Seam reserve check</strong> before you commit a cut. They compute live and store nothing.
	</p>

	<WaistTakeInDistributor />
	<DartBuilder />
	<TaperCalculator />
	<HemCuffMarker />
	<SeamReserveCheck />

	<hr />
	<p class="text-sm">
		Put it to work: <a href="{base}/pants">pants</a>, <a href="{base}/shirts">shirts</a>,
		<a href="{base}/vests">vests</a>, <a href="{base}/coats">coats</a>. Sources are gathered in the
		<a href="https://github.com/jesssullivan/transfemme-tailoring#sources">README</a>.
	</p>
</main>
