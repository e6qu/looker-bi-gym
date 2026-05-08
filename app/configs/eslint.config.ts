import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: appRoot,
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-check": true,
          "ts-expect-error": true,
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
      "@typescript-eslint/no-explicit-any": ["error", { fixToUnknown: false }],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-restricted-types": [
        "error",
        {
          types: {
            "{}": {
              message:
                "Use a domain type, Record<PropertyKey, never>, or unknown instead.",
            },
            Function: {
              message: "Use an explicit function signature instead.",
            },
            Object: {
              message: "Use a domain type or unknown instead.",
            },
            object: {
              message:
                "Use a domain type, Record<PropertyKey, unknown>, or unknown instead.",
            },
          },
        },
      ],
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/require-array-sort-compare": [
        "error",
        { ignoreStringArrays: true },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowBoolean: false, allowNumber: true },
      ],
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowNullableBoolean: false,
          allowNullableNumber: false,
          allowNullableObject: false,
          allowNullableString: false,
          allowNumber: false,
          allowString: false,
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "no-console": "error",
      "no-restricted-syntax": [
        "error",
        {
          message:
            "Use static top-level imports. Inline dynamic imports need an explicit lint exception.",
          selector: "ImportExpression",
        },
      ],
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["configs/**/*.ts", "scripts/**/*.ts", "tests/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
