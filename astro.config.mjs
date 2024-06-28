import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
// import starlightVersions from "starlight-versions";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: "Threlte",
    social: {
      github: "https://github.com/withastro/starlight"
    },
    sidebar: [{
      label: "Learn",
      autogenerate: {
        directory: "learn"
      }
    }, {
      label: "Examples",
      autogenerate: {
        directory: "examples"
      }
    }, {
      label: "Core",
      autogenerate: {
        directory: "reference/core"
      }
    }, {
      label: "Extras",
      autogenerate: {
        directory: "reference/extras"
      }
    }],
    locales: {
      root: {
        lang: "en",
        label: "English"
      },
      "zh-cn": {
        label: "简体中文",
        lang: "zh-CN"
      }
    },
    editLink: {
      baseUrl: "https://github.com/threlte/threlte/edit/main/apps/docs"
    },
    components: {
      Sidebar: "./src/components/sidebar/Sidebar.astro"
    },
    plugins: [
    // starlightVersions({
    //   versions: [{ slug: "1.0" }],
    // }),
    starlightLinksValidator()]
  }), svelte()]
});