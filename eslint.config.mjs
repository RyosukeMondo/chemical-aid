import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore build output
  { ignores: ["**/.next/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Global rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // Project-specific overrides (kept for clarity; redundant with global setting)
  {
    files: ["app/ionization/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
