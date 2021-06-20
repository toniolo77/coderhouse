const path = require('path')

module.exports = { 
    //building mode
    mode: 'production',
    //entry files
    entry: './src/index.ts',
    //target
    target: 'node',
    //output bundles (location)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js', 
    },
    //file resolutions
    resolve: {
        extensions: ['.ts','.js'],
    },
    externals: {
        knex: 'commonjs knex'
    },
    //loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};