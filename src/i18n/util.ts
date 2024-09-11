import type { AstroGlobal } from 'astro'
// import type {
// 	DocSearchTranslation,
// 	NavDict,
// 	UIDict,
// 	UIDictionaryKeys,
// 	UILanguageKeys
// } from './translation-checkers'

/**
 * Convert the map of modules returned by `import.meta.globEager` to an object
 * mapping the language code from each module’s filepath to the module’s default export.
 */
function mapDefaultExports<T>(modules: Record<string, { default: T }>) {
	const exportMap: Record<string, T> = {}
	for (const [path, module] of Object.entries(modules)) {
		const [_dot, lang] = path.split('/')
		exportMap[lang] = module.default
	}
	return exportMap
}

// @ts-ignore
export const translations = mapDefaultExports<UIDict>(
	import.meta.glob('./*/ui.ts', { eager: true })
)
// @ts-ignore
const docsearchTranslations = mapDefaultExports<DocSearchTranslation>(
	import.meta.glob('./*/docsearch.ts', { eager: true })
)
// @ts-ignore
export const navTranslations = mapDefaultExports<NavDict>(
	import.meta.glob('./*/nav.ts', { eager: true })
)

export const fallbackLang = 'en'

/** Returns a dictionary of strings for use with DocSearch. */
// @ts-ignore
export function getDocSearchStrings(Astro: AstroGlobal): DocSearchTranslation {
	const lang = getLanguageFromURL(Astro.url.pathname) || fallbackLang
	// A shallow merge is sufficient here as most of the actual fallbacks are provided by DocSearch.
	return { ...docsearchTranslations[fallbackLang], ...docsearchTranslations[lang] }
}

/**
 * Create a helper function for getting translated strings.
 *
 * Within an Astro component, prefer the `UIString` component,
 * which only needs the key as it has access to the global Astro object.
 *
 * However, you can’t pass an Astro component as a prop to a framework component,
 * so this function creates a look-up method to get the string instead:
 *
 * @example
 * ---
 * import { useTranslations } from '~/i18n/util';
 * const t = useTranslations(Astro);
 * ---
 * <FrameworkComponent label={t('articleNav.nextPage')} />
 */
// @ts-ignore
export function useTranslations(Astro: Readonly<AstroGlobal>): (key: UIDictionaryKeys) => string {
	const lang = getLanguageFromURL(Astro.url.pathname) || 'en'
	// @ts-ignore
	return useTranslationsForLang(lang as UILanguageKeys)
}
// @ts-ignore
export function useTranslationsForLang(lang: UILanguageKeys): (key: UIDictionaryKeys) => string {
	// @ts-ignore
	return function getTranslation(key: UIDictionaryKeys) {
		const str = translations[lang]?.[key] || translations[fallbackLang][key]
		if (str === undefined) throw new Error(`Missing translation for “${key}” in “${lang}”.`)
		return str
	}
}

function getLanguageFromURL(pathname: string) {
	const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//)
	return langCodeMatch ? langCodeMatch[1] : 'en'
}
