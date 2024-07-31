<script lang="ts">
	import SidebarSubList from './SidebarSublist.svelte'

	// interface Link {
	// 	type: 'link'
	// 	label: string
	// 	href: string
	// 	isCurrent: boolean
	// 	// @ts-ignore
	// 	badge: Badge | undefined
	// 	// @ts-ignore
	// 	attrs: LinkHTMLAttributes
	// }

	interface Group {
		type: 'group'
		label: string
		// @ts-ignore
		entries: (Link | Group)[]
		collapsed: boolean
		// @ts-ignore
		badge: Badge | undefined
	}
	// TODO-DefinitelyMaybe: check this assumption
	export let sidebar: Group[]
	// console.log(sidebar)
	let current = ''

	// Recursively check if a group of sidebar entries contains the current page
	// const findIfIsCurrent = (entry: (typeof Astro.props.sidebar)[number]): boolean => {
	// 	if (entry.type === 'link') {
	// 		return entry.isCurrent
	// 	}
	// 	return entry.entries.some((item) => findIfIsCurrent(item))
	// }

	// const isCurrentPage = findIfIsCurrent(entry)
</script>

{#each sidebar as newSidebar}
	<div data-starlight-multi-sidebar-label={newSidebar.label}>
		<!-- class={current == labelEntry.label ? '' : 'hidden'} -->
		<SidebarSubList sublist={newSidebar.entries} />
	</div>
{/each}
