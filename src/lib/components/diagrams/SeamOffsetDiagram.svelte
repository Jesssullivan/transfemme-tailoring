<!-- Why a seam removes 2× the marked offset: it eats fabric from BOTH panels. -->
<svg
	viewBox="0 0 260 124"
	class="text-surface-700-300 my-3 w-full max-w-sm"
	role="img"
	aria-label="A seam removes twice the marked offset, because it takes fabric from both panels meeting at the seam."
>
	<!-- two panels -->
	<rect
		x="18"
		y="18"
		width="100"
		height="58"
		fill="currentColor"
		fill-opacity="0.06"
		stroke="currentColor"
		stroke-opacity="0.4"
	/>
	<rect
		x="142"
		y="18"
		width="100"
		height="58"
		fill="currentColor"
		fill-opacity="0.06"
		stroke="currentColor"
		stroke-opacity="0.4"
	/>
	<text x="68" y="51" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.55">back / front</text>
	<text x="192" y="51" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.55">back / front</text>

	<!-- original seam (center) -->
	<line x1="130" y1="12" x2="130" y2="82" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 3" />
	<text x="130" y="9" text-anchor="middle" font-size="8" fill="currentColor" opacity="0.5">old seam</text>

	<g class="text-primary-500" font-size="9">
		<!-- new stitch lines, offset o each side -->
		<line x1="108" y1="18" x2="108" y2="76" stroke="currentColor" stroke-width="1.5" />
		<line x1="152" y1="18" x2="152" y2="76" stroke="currentColor" stroke-width="1.5" />
		<!-- measurement spans with end ticks -->
		<line x1="108" y1="94" x2="130" y2="94" stroke="currentColor" />
		<line x1="108" y1="90" x2="108" y2="98" stroke="currentColor" />
		<line x1="130" y1="90" x2="130" y2="98" stroke="currentColor" />
		<text x="119" y="89" text-anchor="middle" fill="currentColor">o</text>
		<line x1="130" y1="94" x2="152" y2="94" stroke="currentColor" />
		<line x1="152" y1="90" x2="152" y2="98" stroke="currentColor" />
		<text x="141" y="89" text-anchor="middle" fill="currentColor">o</text>
		<text x="130" y="116" text-anchor="middle" font-weight="600" fill="currentColor">removes 2 × o</text>
	</g>
</svg>
