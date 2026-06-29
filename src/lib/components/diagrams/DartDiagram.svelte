<!-- Double-pointed contour (fish-eye) dart: full pinch width at the waist,
     tapering to a point above and below. A dart removes its full width (not 2×). -->
<svg
	viewBox="0 0 200 200"
	class="text-surface-700-300 my-3 w-full max-w-[14rem]"
	role="img"
	aria-label="A double-pointed contour dart: pinch width at the waist, half-width each side of the centerline, tapering to an upper and a lower point."
>
	<line x1="100" y1="26" x2="100" y2="174" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3" />
	<line x1="40" y1="100" x2="160" y2="100" stroke="currentColor" stroke-opacity="0.3" />
	<text x="42" y="96" font-size="9" fill="currentColor" opacity="0.55">waist</text>

	<g class="text-primary-500" font-size="9">
		<path
			d="M100 42 L80 100 L100 158 L120 100 Z"
			fill="currentColor"
			fill-opacity="0.09"
			stroke="currentColor"
			stroke-width="1.5"
		/>
		<circle cx="100" cy="42" r="2.2" fill="currentColor" />
		<circle cx="100" cy="158" r="2.2" fill="currentColor" />
		<text x="100" y="36" text-anchor="middle" font-size="8" fill="currentColor">upper point</text>
		<text x="100" y="170" text-anchor="middle" font-size="8" fill="currentColor">lower point</text>

		<!-- half-width spans at the waist -->
		<line x1="80" y1="112" x2="100" y2="112" stroke="currentColor" />
		<line x1="80" y1="108" x2="80" y2="116" stroke="currentColor" />
		<line x1="100" y1="108" x2="100" y2="116" stroke="currentColor" />
		<text x="90" y="125" text-anchor="middle" fill="currentColor">½w</text>
		<line x1="100" y1="112" x2="120" y2="112" stroke="currentColor" />
		<line x1="120" y1="108" x2="120" y2="116" stroke="currentColor" />
		<text x="110" y="125" text-anchor="middle" fill="currentColor">½w</text>
	</g>
</svg>
