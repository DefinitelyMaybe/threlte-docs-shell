<script lang="ts">
	export let sublist: SidebarEntry[]
	export let nested = false

	interface Link {
		type: 'link'
		label: string
		href: string
		isCurrent: boolean
		// @ts-ignore
		badge: Badge | undefined
		// @ts-ignore
		attrs: LinkHTMLAttributes
	}

	interface Group {
		type: 'group'
		label: string
		entries: (Link | Group)[]
		collapsed: boolean
		// @ts-ignore
		badge: Badge | undefined
	}

	type SidebarEntry = Link | Group

	// console.log(sublist)
</script>

<ul>
	{#each sublist as entry}
		<li>
			{#if entry.type == 'link'}
				<a
					href={entry.href}
					aria-current={entry.isCurrent && 'page'}
					class:list={[{ large: !nested }, entry.attrs.class]}
					{...entry.attrs}
				>
					<span>{entry.label}</span>
					<!-- {#if entry.badge}
        <Badge
          variant={entry.badge.variant}
          class={entry.badge.class}
          text={entry.badge.text}
        />
      {/if} -->
				</a>
			{:else}
				<details open>
					<!-- ={flattenSidebar(entry.entries).some((i) => i.isCurrent) || !entry.collapsed} -->
					<summary>
						<div class="group-label">
							<span class="large">{entry.label}</span>
							<!-- {#if entry.badge}
            <Badge
              variant={entry.badge.variant}
              class={entry.badge.class}
              text={entry.badge.text}
            />
          {/if} -->
						</div>
					</summary>
					<svelte:self sublist={entry.entries} nested />
				</details>
			{/if}
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		--sl-sidebar-item-padding-inline: 0.5rem;
		list-style: none;
		padding: 0;
	}

	li {
		overflow-wrap: anywhere;
	}

	ul ul li {
		margin-inline-start: var(--sl-sidebar-item-padding-inline);
		border-inline-start: 1px solid var(--sl-color-hairline-light);
		padding-inline-start: var(--sl-sidebar-item-padding-inline);
	}

	.large {
		font-size: var(--sl-text-lg);
		font-weight: 600;
		color: var(--sl-color-white);
	}

	.top-level > li + li {
		margin-top: 0.75rem;
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.2em var(--sl-sidebar-item-padding-inline);
		line-height: 1.4;
		cursor: pointer;
		user-select: none;
	}
	summary::marker,
	summary::-webkit-details-marker {
		display: none;
	}

	.caret {
		transition: transform 0.2s ease-in-out;
		flex-shrink: 0;
	}
	:global([dir='rtl']) .caret {
		transform: rotateZ(180deg);
	}
	[open] > summary .caret {
		transform: rotateZ(90deg);
	}

	a {
		display: block;
		border-radius: 0.25rem;
		text-decoration: none;
		color: var(--sl-color-gray-2);
		padding: 0.3em var(--sl-sidebar-item-padding-inline);
		line-height: 1.4;
	}

	a:hover,
	a:focus {
		color: var(--sl-color-white);
	}

	[aria-current='page'],
	[aria-current='page']:hover,
	[aria-current='page']:focus {
		background: none;
		@apply text-orange hover:text-white;
	}

	a > *:not(:last-child),
	.group-label > *:not(:last-child) {
		margin-inline-end: 0.25em;
	}

	@media (min-width: 50rem) {
		.top-level > li + li {
			margin-top: 0.5rem;
		}
		.large {
			font-size: var(--sl-text-base);
		}
		a {
			font-size: var(--sl-text-sm);
		}
	}
</style>
