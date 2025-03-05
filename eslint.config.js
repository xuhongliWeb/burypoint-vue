import js from "@eslint/js";
import globals from "globals";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    {
        ignores: ["node_modules/**", "dist/**",'lib/**', ".history/**"],
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser, // 包含浏览器环境的全局变量
                ...globals.node, // 包含 Node.js 环境的全局变量
            },
            parser: tsEslintParser,
            sourceType: "module",
        },
        plugins: {
            "@typescript-eslint": tsEslint,
        },
        rules: {
            ...tsEslint.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": "error", // 示例规则
        },
    },
    eslintConfigPrettier, // 禁用与 Prettier 冲突的规则
];


