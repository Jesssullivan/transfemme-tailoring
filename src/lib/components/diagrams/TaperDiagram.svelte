<!-- Tapering a sleeve/leg: the new seam matches the original at the upper point
     (offset ~0 over muscle) and diverges below, reaching o₂ at the hem. Blend
     back to the original above the upper point so the armscye/seat isn't tight. -->
<svg
	viewBox="0 0 200 200"
	class="text-surface-700-300 my-3 w-full max-w-[13rem]"
	role="img"
	aria-label="Tapering a sleeve or leg: the new seam equals the original at the upper point and diverges to the hem, blended back above the upper point."
>
	<path
		d="M58 24 L122 24 L114 180 L66 180 Z"
		fill="currentColor"
		fill-opacity="0.05"
		stroke="currentColor"
		stroke-opacity="0.4"
	/>
	<text x="90" y="108" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.5">sleeve / leg</text>

	<g class="text-primary-500" font-size="9">
		<!-- new tapered seam on the right: aligned at upper point, diverging below -->
		<path d="M121 24 L119 74 Q108 150 96 180" fill="none" stroke="currentColor" stroke-width="1.6" />
		<circle cx="119" cy="74" r="2.2" fill="currentColor" />
		<text x="123" y="72" fill="currentColor">upper point (o₁≈0)</text>

		<!-- o2 span at the hem between original (114) and new (96) -->
		<line x1="96" y1="190" x2="114" y2="190" stroke="currentColor" />
		<line x1="96" y1="186" x2="96" y2="194" stroke="currentColor" />
		<line x1="114" y1="186" x2="114" y2="194" stroke="currentColor" />
		<text x="105" y="186" text-anchor="middle" fill="currentColor">o₂</text>
	</g>
</svg>
