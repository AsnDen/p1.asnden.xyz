import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const rules = {
    "no-unused-vars": [
        "error",
        {
            args: "all",
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        },
    ],

    "no-undef": "error",

    "no-var": "error",
    "prefer-const": "error",

    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-with": "error",

    "no-global-assign": "error",
    "no-delete-var": "error",
    "no-proto": "error",

    eqeqeq: ["error", "always"],
    curly: ["error", "all"],

    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",

    "no-constant-condition": "error",
    "no-unreachable": "error",
    "no-unreachable-loop": "error",

    "no-self-assign": "error",
    "no-self-compare": "error",

    "no-empty": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "no-lone-blocks": "error",
    "no-sequences": "error",

    "no-unneeded-ternary": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",

    "object-shorthand": ["error", "always"],

    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "prefer-spread": "error",
    "prefer-rest-params": "error",

    "no-debugger": "error",
    "no-alert": "error",
    "no-console": "error",

    "no-multi-spaces": "error",

    "no-multiple-empty-lines": [
        "error",
        {
            max: 1,
            maxEOF: 0,
            maxBOF: 0,
        },
    ],
};

export default defineConfig([
    {
        ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**"],
    },

    {
        files: ["**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.browser,
            },
        },

        plugins: {
            js,
        },

        extends: [js.configs.recommended],

        rules: rules,
    },

    {
        files: ["**/*.ts"],

        extends: [...tseslint.configs.recommended],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: {
                ...globals.browser,
            },
        },

        rules: {
            ...rules,

            "no-undef": "off",

            "no-unused-vars": "off",

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
]);
