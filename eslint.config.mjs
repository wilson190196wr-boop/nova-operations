import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Plans de travail temporaires : du code construit, exclu de git par
    // .git/info/exclude. Sans cette ligne, `npm run lint` analyse leurs
    // bundles et noie les vrais avertissements sous des dizaines de milliers
    // de faux.
    ".claude/**",
  ]),
]);

export default eslintConfig;
