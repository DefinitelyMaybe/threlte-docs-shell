<script lang="ts">
	let option = '/learn/getting-started/intro'
	let nav: HTMLAnchorElement
	const packages = [
		{ label: 'Learn', href: '/learn/getting-started/intro' },
		{ label: 'Extras', href: '/reference/extras/example' }
	]
</script>

<div class="flex flex-row items-center">
	<select
		class="mr-4 flex shrink rounded-md border border-[var(--sl-color-gray-5)] bg-blue-900 px-3 py-2 text-[var(--sl-color-text)] hover:text-white"
		bind:value={option}
		on:change={() => {
			nav.click()
		}}
	>
		{#each packages as { label, href }}
			<option value={href}>{label}</option>
		{/each}
	</select>
	<a href={option} bind:this={nav} class="hidden"> </a>
</div>
