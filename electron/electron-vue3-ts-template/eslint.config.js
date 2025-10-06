import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintrcAutoImport from './.eslintrc-auto-import.json' with { type: 'json' };

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,vue}"]
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...eslintrcAutoImport.globals
			}
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{
		files: ["**/*.vue"],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		rules: {
			// 如果组件名称为 index，ESLint 就会忽略此次组件名称的检查
			// ESLint: Component name "index" should always be multi-word. (vue/multi-word-component-names)
			'vue/multi-word-component-names': [
				'warn',
				{
					// 指定需要忽略的组件名称
					ignores: ['index', '401', '403', '404', '500']
				}
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				// 忽略以 _ 开头的变量、形参、捕获的错误变量
				{
					"argsIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"caughtErrorsIgnorePattern": "^_"
				}
			],
		}
	}
];
