module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:prettier/recommended'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 6,
		sourceType: 'module',
	},
  	plugins: ['html', 'vue', 'import', 'prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-param-reassign': 'off',
		'class-methods-use-this': 0,
		'max-len': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'no-unused-vars': 'off', // for vue
	},
};
