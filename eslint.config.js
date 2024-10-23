import globals from "globals";
import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import vitest from "eslint-plugin-vitest";

const testJestConfig = {
	files: ["{test,test-jest}/**/*.test.{js,ts,tsx}"],
	languageOptions: {
		globals: {
			...globals.jest,
		},
	},
};

const testVitestConfig = {
	files: ["{test,test-vitest}/**/*.test.{js,ts,tsx}"],
	languageOptions: {
		globals: {
			...vitest.environments.env.globals,
		},
	},
	plugins: {
		vitest: vitest,
	},
	rules: {
		...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
	},
};

export default [
	{
		ignores: ["**/fixtures/**", "**/dist/**", "node_modules/*"],
	},
	js.configs.recommended,
	{
		files: ["**/*.cjs", "**/*.mjs", "**/*.js"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		plugins: {
			jsdoc: jsdoc,
		},
		rules: {
			"jsdoc/require-description": "error",
			"jsdoc/check-values": "error",
		},
	},
	testJestConfig,
	testVitestConfig,
];
