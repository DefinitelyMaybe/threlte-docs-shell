import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { resolve } from "path";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },
  integrations: [
    starlight({
      title: "Threlte",
      logo: {
        src: "$assets/logo/threlte-logo.png",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/threlte/threlte",
        twitter: "https://twitter.com/threlte",
        discord: "https://discord.gg/EqUBCfCaGm",
      },
      customCss: ["./src/styles/app.css", "./src/styles/tailwind.css"],
      components: {
        Header: "$components/Header.astro",
        Sidebar: "$components/Sidebar.astro",
      },
      sidebar: [
        {
          label: "Learn",
          autogenerate: {
            directory: "learn",
          },
        },
        {
          label: "Examples",
          autogenerate: {
            directory: "examples",
          },
        },
        {
          label: "Core",
          autogenerate: {
            directory: "reference/core",
          },
        },
        {
          label: "Extras",
          autogenerate: {
            directory: "reference/extras",
          },
        },
        {
          label: "GLTF",
          autogenerate: {
            directory: "reference/gltf",
          },
        },
        {
          label: "Rapier",
          autogenerate: {
            directory: "reference/rapier",
          },
        },
        {
          label: "Theatre",
          autogenerate: {
            directory: "reference/theatre",
          },
        },
        {
          label: "Flex",
          autogenerate: {
            directory: "reference/flex",
          },
        },
      ],
      locales: {
        root: {
          lang: "en",
          label: "English",
        },
        "zh-cn": {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      editLink: {
        baseUrl: "https://github.com/threlte/threlte/edit/main/apps/docs",
      },
      expressiveCode: {
        themes: ["dracula-soft"],
      },
      plugins: [starlightLinksValidator()],
    }),
    svelte(),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        $components: resolve("./src/components"),
        $assets: resolve("./src/assets"),
      },
    },
  },
});
