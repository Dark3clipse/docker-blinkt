const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const spawn = require('child_process').spawn;
const prefix = "./../";


module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: path.resolve(__dirname, prefix+"src/loader.ts"),
	target: 'node',
	output: {
		path: path.resolve(__dirname, prefix+"dist"),
		publicPath: '',
		filename: "bundle.[name].js",
		chunkFilename: "bundle.[name].js",
	},
	externals: [
		nodeExternals(),
		{"wiringpi-node": require('wiringpi-node')}
	],
	resolve: {

		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"],
		modules: [
			path.resolve(__dirname, prefix+"src"),
			path.resolve(__dirname, prefix+"node_modules"),
			prefix+"node_modules"
		],

		alias:{

			//sync with tsconfig
			"src": path.resolve(__dirname, prefix+"src"),
			"settings": path.resolve(__dirname, prefix+"settings.json"),
			"package": path.resolve(__dirname, prefix+"package.json"),

			//modules
			"modules": path.resolve(__dirname, prefix+"node_modules"),
		}
	},
	module: {
		rules: [{ 
			test: /\.(ts|js)x?$/, 
			include: [
				path.resolve(__dirname, prefix+"src")
			],
			use: [{
				loader: "babel-loader",
				options: {
					"presets": [
				        ["@babel/env", {
				        	"targets": {
				        		"node": true,
				        	}
				        }],
				        "@babel/typescript"
				    ],
				    "plugins": [
						"babel-plugin-transform-typescript-metadata",
						["@babel/plugin-proposal-decorators", {"legacy": true}],
				        ["@babel/proposal-class-properties", { "loose": true }],
				        "@babel/proposal-object-rest-spread",
				        "@babel/plugin-proposal-optional-chaining"
				    ],
				    "cacheDirectory": true
				}
			}]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			"BUILD_TARGET": JSON.stringify("backend")
		}),
		{
			apply: (compiler) => {
				compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
					const child = spawn('bash', [path.resolve(__dirname, 'postbuild.sh')], {
						cwd: path.resolve(__dirname, prefix)
					});
					child.on('exit', () => {
						console.log('Post-build steps completed.');
					});
					child.stdout.pipe(process.stdout);
					child.stderr.pipe(process.stderr);
				});
			}
		}
	]
};