<script lang="ts">
	import { onMount } from 'svelte'
	import SidebarSubList from './SidebarSublist.svelte'

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
	export let lang: string

	let location = ''
	let current = ''

	const toggleSidebars = () => {
		if (lang != 'en') {
			current = window.location.pathname.split('/')[2]
			if (current == 'reference') {
				current = window.location.pathname.split('/')[3]
			}
		} else {
			current = window.location.pathname.split('/')[1]
			if (current == 'reference') {
				current = window.location.pathname.split('/')[2]
			}
		}
	}

	onMount(() => {
		location = document.location.href
		const observer = new MutationObserver((mutations) => {
			if (location !== document.location.href) {
				location = document.location.href
				toggleSidebars()
			}
		})
		observer.observe(document.body, { childList: true, subtree: true })
		toggleSidebars()
		return () => {
			observer.disconnect()
		}
	})
</script>

{#each sidebar as newSidebar}
	<div
		data-starlight-multi-sidebar-label={newSidebar.label}
		class={current == newSidebar.label.toLocaleLowerCase() ? '' : 'hidden'}
	>
		<SidebarSubList sublist={newSidebar.entries} />
	</div>
{/each}
