import type { StarlightConfig } from "@astrojs/starlight/types";
import type { StarlightVersionsConfig } from "starlight-versions";
import type { Props } from "@astrojs/starlight/props";
import { z } from "astro/zod";
import { AstroError } from "astro/errors";
import {} from "@astrojs/starlight";

type StarlightSidebar = Props["sidebar"];
type Version = z.output<typeof VersionSchema>;

const currentVersionSidebarGroupLabel = Symbol(
  "StarlightVersionsCurrentVersionSidebarGroupLabel"
);

export const VersionBaseSchema = z.object({
  /**
   * The version redirect strategy used when navigating to this version:
   *
   * - `same-page`: Redirect to the same page when navigating to this version.
   * - `root`: Redirect to the root page of the documentation when to this version.
   *
   * @default 'same-page'
   */
  redirect: z
    .union([z.literal("root"), z.literal("same-page")])
    .default("same-page"),
});

export const VersionSchema = z
  .object({
    /**
     * An optional label used in the UI when displaying the version.
     * If not provided, the version slug is used.
     *
     * @example 'v2.0'
     * @example 'v3.1.2'
     */
    label: z.string().optional(),
    /**
     * The version slug used in URLs to identify the version and its content.
     *
     * @example '2.0'
     * @example '3-1-2'
     */
    slug: z
      .string()
      .refine((value) => stripLeadingSlash(stripTrailingSlash(value))),
  })
  .merge(VersionBaseSchema);

// A version is considered as the current version if it's undefined.
export function getVersionSidebar(
  version: Version | undefined,
  sidebar: StarlightSidebar
): StarlightSidebar {
  const sidebarVersionGroup = sidebar.find(
    (item) =>
      item.label ===
      (version?.slug ?? currentVersionSidebarGroupLabel.toString())
  );

  if (!sidebarVersionGroup || !("entries" in sidebarVersionGroup)) {
    throw new AstroError(
      `Failed to find a sidebar group for the ${
        version ? `version '${version.slug}'` : "current version"
      }.`
    );
  }

  return sidebarVersionGroup.entries;
}

// An undefined version is valid and represents the current version.
export function getVersionFromSlug(
  config: StarlightVersionsConfig,
  starlightConfig: StarlightConfig,
  slug: string
): Version | undefined {
  const segments = slug.split("/");

  const versionOrLocaleSegment = segments[0];

  if (!versionOrLocaleSegment) return undefined;

  const version = config.versions.find(
    (version) => version.slug === versionOrLocaleSegment
  );

  if (version) return version;

  const locales = Object.keys(starlightConfig.locales ?? {});

  if (!locales.includes(versionOrLocaleSegment)) return undefined;

  const versionSegment = segments[1];

  return config.versions.find((version) => version.slug === versionSegment);
}

function stripLeadingSlash(filePath: string) {
  if (!filePath.startsWith("/")) {
    return filePath;
  }

  return filePath.slice(1);
}

function stripTrailingSlash(filePath: string) {
  if (!filePath.endsWith("/")) {
    return filePath;
  }

  return filePath.slice(0, -1);
}
