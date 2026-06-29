<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Machine setup &amp; the treadle restoration — Transfemme Tailoring</title>
	<meta
		name="description"
		content="Setting up the working machine (a computerized SINGER 6600C) for wool and shirting, plus the parallel restoration log for an 1800s treadle Singer: identify, free, oil, thread, and the corrected tension and per-model needle rules."
	/>
</svelte:head>

<main class="prose mx-auto max-w-3xl px-6 py-10">
	<p class="text-surface-500 m-0 text-sm">Build log · the machines</p>
	<h1>Setting up the machine</h1>
	<p>
		There are two machines in this story and they are not equals — yet. The one I actually sew on is a modern
		computerized <strong>SINGER Heavy Duty 6600C</strong>: it zigzags, it cuts six one-step buttonholes, it does a
		machine blind hem and stretch stitches for slippery linings, and it has the motor to climb a stacked waistband
		without complaint. The other is an <strong>1800s treadle Singer</strong> — cast iron, foot-powered, gorgeous — that
		is a <em>restoration project, not a working machine</em>. I keep its log here because freeing it is half the joy of
		this whole undertaking, and because a straight lockstitch on a treadle is the nicest construction seam in the world
		once it runs. But every garment guide assumes the 6600C is doing the work.
	</p>

	<h2 id="workhorse">The 6600C — the everyday machine</h2>
	<p>
		Pick the needle and thread to the fabric; this prevents more grief than any other single choice. For the two cotton <strong
			>dress shirts</strong
		>, a Microtex/Sharp <code>70/10</code>–<code>80/12</code>
		with a 50&nbsp;wt all-purpose thread gives the cleanest holes on crisp collars and plackets; stitch length ~2.0–2.5&nbsp;mm.
		For the <strong>wool</strong> trousers, vests and coats, a Universal <code>80/12</code> for tropical/worsted,
		<code>90/14</code>
		for medium suiting, and
		<code>100/16</code> only for the thickest layered seams; stitch length ~2.5–3.0&nbsp;mm — slightly longer, because very
		short stitches pucker wool and are miserable to unpick during a fitting. Keep a Jeans/Denim or Topstitch needle on hand
		for the stacked waistband and seat intersections.
	</p>
	<p>
		The stitches that earn their keep: a plain <strong>straight stitch</strong> for every construction seam (taking in,
		darts, tapers, topstitch); a <strong>zigzag or overcast</strong>
		to finish the raw edges you expose when you take a seam in; a <strong>one-step buttonhole</strong>
		when you move a button stance; the <strong>machine blind hem</strong> for casual hems (the invisible tailored
		version is still nicer by hand); and a <strong>stretch stitch</strong> for any knit lining. Always test stitch,
		tension and length on a <em>doubled scrap of the actual garment fabric</em> first — wool and slick lining behave nothing
		alike.
	</p>

	<h3 id="tension">Balanced tension — the tug-of-war rule</h3>
	<p>
		A balanced lockstitch buries its knot in the <strong>middle</strong> of the layers. When it doesn't, read it as a
		tug-of-war: <em>the side showing the wrong thread is the side that is winning.</em> This rule is the same on any machine,
		and it is the one beginners most often get backwards:
	</p>
	<div class="card preset-outlined-surface-500 not-prose my-4 p-4 text-sm">
		<table class="w-full">
			<thead>
				<tr class="text-surface-600 dark:text-surface-400 text-left">
					<th scope="col" class="py-1 pr-3 font-medium">You see…</th>
					<th scope="col" class="py-1 font-medium">Fix</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-surface-300 dark:border-surface-700 border-t">
					<td class="py-1 pr-3">Bobbin (under) thread dragged up onto the <strong>top</strong></td>
					<td class="py-1">Top tension is too <strong>tight</strong> → <strong>loosen</strong> the top dial</td>
				</tr>
				<tr class="border-surface-300 dark:border-surface-700 border-t">
					<td class="py-1 pr-3">Top thread looping on the <strong>underside</strong></td>
					<td class="py-1">Top tension is too <strong>loose</strong> → <strong>tighten</strong> the top dial</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p>
		Adjust the top dial in small steps on a doubled scrap; touch the bobbin-case screw only as a last resort. And before
		you blame tension at all, rule out the usual suspects: a mis-threaded top, thread not seated <em>between</em> the tension
		discs (thread with the presser foot up so the discs are open), a bent or blunt needle, or lint packed in the bobbin case.
	</p>

	<h2 id="treadle">The treadle restoration log</h2>
	<p>
		This is the romance project. A foot-powered treadle head is <strong>straight-lockstitch only</strong>
		— no zigzag, no buttonholer, and often no reverse — so it will eventually do construction seams, darts, tapers and topstitching
		beautifully, but never the buttonholes or the edge-finishing (that stays on the 6600C, or goes to hand-work). Here is
		the order I'm working through.
	</p>
	<h3 id="identify">Identify &amp; date it</h3>
	<p>
		Find the serial stamped into the metal (on a treadle-era head it sits on a raised boss on the front of the bed, not
		on a paper label) and look it up in the
		<a
			href="https://ismacs.net/singer_sewing_machine_company/serial-numbers/singer-sewing-machine-serial-number-database.html"
			>ISMACS serial-number database</a
		>. A 19th-century machine usually has <em>no letter prefix</em> (use the early-serial tables); 1900-on machines
		carry a one- or two-letter prefix. Identify the model by its bobbin/hook system and decals:
		<strong>Lotus / Red Eye</strong>
		decals = Model 66 (top drop-in oscillating bobbin — the easiest to learn on); a
		<strong>left-faceplate tension</strong>
		with a removable vertical bobbin case = Model 15; <strong>Sphinx/Egyptian</strong> decals = the vibrating-shuttle 27/127/28/128
		(a long bullet shuttle, not a round bobbin); a full-rotary hook = the 201.
	</p>
	<h3 id="free">Free, clean &amp; protect</h3>
	<ul>
		<li>
			<strong>Assess first (belt off):</strong> turn the handwheel by hand. Free = mostly cleaning and oiling. Stiff or seized
			= a penetrate-and-free pass before anything else.
		</li>
		<li>
			<strong>Free a seized head</strong> with a drop of penetrant on every pivot, oil hole and the hook/shuttle race;
			let it sit for hours, then <em>gently rock</em> the handwheel back and forth — never force it, and never soak the whole
			head (it lifts the japanning and gold decals).
		</li>
		<li>
			<strong>Protect the finish:</strong> never use ammonia/Windex on the decals (it strips gold to silver); don't
			strip the japanning; clean paint with a barely-damp cloth and protect with a microcrystalline paste wax. See
			<a href="https://www.treadleon.net/sewingmachineshop/cleaningmachines/cleaningmachines.html"
				>TreadleOn's cleaning guide</a
			>.
		</li>
		<li>
			<strong>Replace the needle and the leather belt</strong>, service the stand's pivot bearings and both pitman-rod
			ends (oil, never grease), then test on doubled scrap.
		</li>
	</ul>
	<h3 id="oil">Oil it right</h3>
	<p>
		Use proper sewing-machine oil only — the clear, light Singer oil I have is exactly right. <strong>Never</strong>
		3-in-1, motor oil, household oil or WD-40: they oxidize and gum, which is the very failure you're cleaning out. One drop
		per moving point, following the manual's dotted diagram (top-arm oil holes, needle/presser bars, take-up pivot, handwheel
		shaft, the hook/shuttle race, and every underside pivot with the head tipped back). On an all-metal treadle everything
		takes
		<strong>oil, not grease</strong> — there are no motor gears to pack. Re-oil after the first hour while it flushes
		residue, and never oil the tension discs, the thread path, or the belt. (<a
			href="https://www.motherearthnews.com/homesteading-and-livestock/treadle-sewing-machine-zmaz75mazgoe/"
			>Mother Earth News</a
		>
		on treadle care;
		<a
			href="https://singer-featherweight.com/blogs/schoolhouse/how-and-where-to-oil-a-singer-featherweight-221-sewing-machine"
			>the oil-point method</a
		>.)
	</p>
	<h3 id="needle-orientation">Needle orientation (per model)</h3>
	<p>
		A backwards needle won't form a stitch and can strike the hook. The <strong>universal rule</strong>: the long groove
		and the threading direction face <em>away</em> from the hook, and the scarf (the scooped-out part above the eye)
		faces <em>toward</em> the hook; thread enters the eye from the groove side. The flat-of-shank direction is then model-specific:
	</p>
	<div class="card preset-outlined-surface-500 not-prose my-4 p-4 text-sm">
		<table class="w-full">
			<thead>
				<tr class="text-surface-600 dark:text-surface-400 text-left">
					<th scope="col" class="py-1 pr-3 font-medium">Model</th>
					<th scope="col" class="py-1 pr-3 font-medium">Flat faces</th>
					<th scope="col" class="py-1 font-medium">Needle system</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-surface-300 dark:border-surface-700 border-t">
					<td class="py-1 pr-3">66 / 99</td>
					<td class="py-1 pr-3">RIGHT (groove left, thread left→right)</td>
					<td class="py-1 font-mono">15×1 / HA×1</td>
				</tr>
				<tr class="border-surface-300 dark:border-surface-700 border-t">
					<td class="py-1 pr-3">15</td>
					<td class="py-1 pr-3">LEFT (groove right, thread right→left)</td>
					<td class="py-1 font-mono">15×1 / HA×1</td>
				</tr>
				<tr class="border-surface-300 dark:border-surface-700 border-t">
					<td class="py-1 pr-3">201</td>
					<td class="py-1 pr-3">LEFT</td>
					<td class="py-1 font-mono">15×1 / HA×1</td>
				</tr>
				<tr class="border-surface-300 dark:border-surface-700 border-t">
					<td class="py-1 pr-3">127 / 128</td>
					<td class="py-1 pr-3">per manual</td>
					<td class="py-1 font-mono">round-shank 127×1</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p>
		Confirm against your specific model's manual — and if it skips stitches, suspect a backwards needle <em>first</em>.
	</p>
	<h3 id="treadle-limits">What it can &amp; can't do</h3>
	<p>
		Once running, the treadle does every straight-stitch task: construction seams, taking in side and center-back seams,
		tapering, darts, topstitching, basting. It <strong>cannot</strong> zigzag, buttonhole, or (usually) reverse — so on the
		treadle you secure a seam end by overlapping 3–4 stitches or leaving long tails to hand-tie (and you always stitch a dart
		tip off to nothing and hand-tie it, never backtack). Raw edges get a French seam, flat-fell, Hong-Kong bind, pinking,
		or a hand overcast; buttonholes and invisible hems are hand-worked. None of that is a constraint on the 6600C — it's just
		the treadle's charmingly Victorian rulebook.
	</p>

	<hr />
	<p class="text-sm">
		Next: <a href="{base}/tools">assemble the tools</a> · the
		<a href="{base}/fitting">fitting theory &amp; calculators</a>, then the garment guides for
		<a href="{base}/pants">pants</a>, <a href="{base}/shirts">shirts</a>,
		<a href="{base}/vests">vests</a> and <a href="{base}/coats">coats</a>.
	</p>
</main>
