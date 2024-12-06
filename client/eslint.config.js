import eslintConfigPrettier from "eslint-config-prettier";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactlint from "eslint-plugin-react";

export default [
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
  ),
  reactlint.configs.flat.all,
  eslintConfigPrettier,
];
