<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { Menu, X } from '@lucide/svelte';
	import SaturnMark from '$lib/components/SaturnMark.svelte';
	import { AppBar, Dialog, Navigation } from '@skeletonlabs/skeleton-svelte';
	import { TinyVectors } from '@tummycrypt/tinyvectors';
	import '../app.css';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let { children } = $props();

	let mobileOpen = $state(false);

	// Multi-page static site under a GitHub Pages project path: every internal
	// link is prefixed with `base` ('' locally, '/transfemme-tailoring' deployed).
	const navLinks: { href: string; label: string }[] = [
		{ href: `${base}/machine`, label: 'Machine' },
		{ href: `${base}/tools`, label: 'Tools' },
		{ href: `${base}/fitting`, label: 'Fitting' },
		{ href: `${base}/pants`, label: 'Pants' },
		{ href: `${base}/shirts`, label: 'Shirts' },
		{ href: `${base}/vests`, label: 'Vests' },
		{ href: `${base}/coats`, label: 'Coats' },
	];

	const SITE_NAME = 'Transfemme Tailoring';
	const SITE_URL = 'https://jesssullivan.github.io/transfemme-tailoring';
	const SITE_TITLE = 'Transfemme Tailoring — refitting masc formalwear, in the open';
	const SITE_DESCRIPTION =
		'A first-person build log and interactive alteration calculators for converting oversized, masculine-cut formalwear into a well-fitted transfeminine silhouette: machine setup, tools, fitting theory, and stepwise guides for pants, shirts, vests, and coats.';
	const REPO_URL = 'https://github.com/jesssullivan/transfemme-tailoring';
	const SECURITY_URL = 'https://github.com/jesssullivan/transfemme-tailoring/security/advisories/new';
	const OG_IMAGE = `${SITE_URL}/favicon.svg`;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		url: SITE_URL,
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		inLanguage: 'en',
	};
</script>

<svelte:head>
	<link rel="canonical" href={SITE_URL} />
	<meta name="description" content={SITE_DESCRIPTION} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:site_name" content={SITE_NAME} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD; JSON.stringify on a literal object is safe and the </script> sentinel is split to avoid early termination -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
</svelte:head>

<div class="relative flex min-h-screen flex-col bg-transparent">
	<!-- TinyVectors warm background. Browser-only — the component uses
	     window/navigator APIs that crash under SSR. Fixed, behind everything. -->
	{#if browser}
		<div
			class="pointer-events-none fixed inset-0 -z-10"
			style="overflow:hidden"
			aria-hidden="true"
			data-testid="brand-vectors-bg"
		>
			<TinyVectors
				theme="custom"
				colors={['#cb6738', '#d99d6a', '#a14a52', '#6b4f3a', '#3d6b8c']}
				opacity={0.1}
				blobCount={5}
				enableScrollPhysics={true}
				enableDeviceMotion={false}
			/>
		</div>
	{/if}
	<a
		href="#content"
		class="focus:bg-primary-500 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
		>Skip to content</a
	>

	<AppBar class="saturn-nav sticky top-0 z-40">
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto] px-4 py-2">
			<AppBar.Lead>
				<a
					href="{base}/"
					class="hover:text-primary-500 inline-flex items-center gap-2 font-mono text-lg font-bold tracking-tight whitespace-nowrap transition-colors"
					aria-label={SITE_NAME + ' home'}
				>
					<SaturnMark class="text-primary-500 h-[1.05em] w-[1.05em]" />{SITE_NAME}</a
				>
			</AppBar.Lead>
			<AppBar.Headline></AppBar.Headline>
			<AppBar.Trail>
				<nav class="hidden items-center gap-4 text-sm lg:flex" aria-label="Section navigation">
					{#each navLinks as { href, label } (href)}
						<a {href} class="hover:text-primary-500 transition-colors" aria-label={label}>{label}</a>
					{/each}
					<ThemeSwitcher />
				</nav>

				<!-- Mobile drawer -->
				<Dialog
					open={mobileOpen}
					onOpenChange={(d) => {
						mobileOpen = d.open;
					}}
					closeOnInteractOutside
					closeOnEscape
					preventScroll
				>
					<Dialog.Trigger class="hover:bg-surface-200-800 rounded p-2 lg:hidden" aria-label="Open navigation">
						<Menu class="h-5 w-5" />
					</Dialog.Trigger>
					<Dialog.Backdrop class="fixed inset-0 z-40 bg-black/40" />
					<Dialog.Positioner class="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw]">
						<Dialog.Content class="bg-surface-50-950 flex w-full flex-col">
							<div class="border-surface-200-800 flex items-center justify-between border-b px-4 py-3">
								<span class="font-mono text-sm font-semibold">{SITE_NAME}</span>
								<Dialog.CloseTrigger class="hover:bg-surface-200-800 rounded p-2" aria-label="Close navigation">
									<X class="h-5 w-5" />
								</Dialog.CloseTrigger>
							</div>
							<Navigation layout="sidebar">
								<Navigation.Content>
									<Navigation.Menu>
										<Navigation.TriggerAnchor href="{base}/" onclick={() => (mobileOpen = false)}>
											<Navigation.TriggerText>Overview</Navigation.TriggerText>
										</Navigation.TriggerAnchor>
										{#each navLinks as { href, label } (href)}
											<Navigation.TriggerAnchor {href} onclick={() => (mobileOpen = false)}>
												<Navigation.TriggerText>{label}</Navigation.TriggerText>
											</Navigation.TriggerAnchor>
										{/each}
									</Navigation.Menu>
								</Navigation.Content>
								<Navigation.Footer>
									<div class="flex w-full justify-center py-2">
										<ThemeSwitcher />
									</div>
								</Navigation.Footer>
							</Navigation>
						</Dialog.Content>
					</Dialog.Positioner>
				</Dialog>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>

	<div id="content" class="flex-1">
		{@render children?.()}
	</div>

	<footer id="contact" class="border-surface-200-800 bg-surface-100-900/80 mt-16 border-t backdrop-blur-sm">
		<div class="container mx-auto flex flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
			<p class="text-surface-700-300">
				A personal build log — a learning notebook, not a tailoring authority. Check the care label and baste-and-fit
				before you ever cut; verify against the linked sources.
			</p>
			<nav class="flex flex-wrap gap-4" aria-label="Footer">
				<a href="{base}/agent" class="hover:text-primary-500 transition-colors">Agent AX</a>
				<a href={REPO_URL} target="_blank" rel="noopener" class="hover:text-primary-500 transition-colors">GitHub</a>
				<a href={SECURITY_URL} target="_blank" rel="noopener" class="hover:text-primary-500 transition-colors"
					>Security</a
				>
			</nav>
		</div>
	</footer>
</div>
