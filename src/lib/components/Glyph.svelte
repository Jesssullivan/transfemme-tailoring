<script lang="ts">
	// Decorative FiraCode Nerd Font glyph (FontAwesome PUA, strictly U+F000–U+F2FF —
	// the FA region the patched FiraCodeNerdFontMono subset ships; see
	// scripts/subset-firacode-nerd-font.sh). Always rendered in the mono stack (the
	// patched face) and always aria-hidden: glyphs are accents, never the sole
	// signal — every use pairs with a real text label, and the sr-only aria-live
	// result mirrors carry the meaning for screen readers. Richer/measurement
	// icons (e.g. the ruler) stay on Lucide SVG, not here.
	const GLYPHS = {
		scissors: 0xf0c4,
		calculator: 0xf1ec,
		'triangle-exclamation': 0xf071,
		check: 0xf00c,
		times: 0xf00d,
		refresh: 0xf021,
		cog: 0xf013,
		wrench: 0xf0ad,
		lock: 0xf023,
		'thumb-tack': 0xf08d,
	} as const;

	let {
		name,
		codepoint,
		class: extra = '',
	}: { name?: keyof typeof GLYPHS; codepoint?: number; class?: string } = $props();

	const cp = $derived(name ? GLYPHS[name] : codepoint);
	const char = $derived(cp ? String.fromCodePoint(cp) : '');
</script>

<span class="font-mono {extra}" aria-hidden="true">{char}</span>
