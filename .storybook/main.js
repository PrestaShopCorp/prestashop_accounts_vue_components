// .storybook/main.js

const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
    stories: ['../**/*.stories.mdx'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-knobs',
        {
            name: '@storybook/addon-docs/preset',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null,
            },
        },
    ],
    webpackFinal: async (config, {configType}) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        config.resolve.alias = {
            '@': path.resolve(__dirname, '../src/'),
            'vue$': 'vue/dist/vue.esm.js',
        };

        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        });

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            exclude: [/node_modules/],
            include: path.resolve(__dirname, '../src/'),
        });

        config.module.rules.push({
            test: /\.stories\.jsx?$/,
            loaders: [require.resolve('@storybook/source-loader')],
            exclude: [/node_modules/],
            enforce: 'pre',
        });

        // Return the altered config
        return config;
    },
};