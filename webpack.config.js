const path = require('path');
module.exports = {
    entry: "./compiled/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "libpack.js",
        library: 'AnimatedCanvasLib',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".js"]
    },
    mode: 'development'
}