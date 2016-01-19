var path = require("path");

var config = {
    entry: "./App/js/app.js",
    output: {
        path: path.resolve("wwwwroot/"),
        publicPath: "/scripts/",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};

module.exports = config;