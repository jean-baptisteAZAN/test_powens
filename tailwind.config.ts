import type { Config } from 'tailwindcss';

import { join } from "path";
import { skeleton } from "@skeletonlabs/skeleton/plugin";
import * as themes from "@skeletonlabs/skeleton/themes";

/** @type {import('tailwindcss').Config} \*/
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    join(require.resolve('@skeletonlabs/skeleton-react'), '../**/*.{html,js,jsx,tsx,ts}')
  ],
  theme: {
    extend: {},
  },
  plugins: [
    skeleton({
      themes: [ themes.cerberus, themes.rose ]
    })
  ]
}
