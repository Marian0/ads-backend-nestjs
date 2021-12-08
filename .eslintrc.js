module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        bracketSpacing: true,
        embeddedLanguageFormatting: "auto",
        insertPragma: false,
        printWidth: 100,
        proseWrap: "preserve",
        quoteProps: "as-needed",
        requirePragma: false,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "all",
        useTabs: false,
      },
    ],
  },
};
