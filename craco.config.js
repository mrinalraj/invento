const CracoAlias = require('craco-alias')

module.exports = {
	babel: {
		plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
	},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'options',
				baseUrl: './src',
				aliases: {
					'@modules': 'modules',
					'@requests': 'requests',
					'@components': 'sharedComponents',
					'@utils': 'utils',
				},
			},
		},
	],
}
