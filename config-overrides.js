const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    url: require.resolve("url"),
    fs: false,
    net: false,
    tls: false,
    zlib: false,
    http: require.resolve("stream-http"),
    http2: false,
    https: require.resolve("https-browserify"),
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify"),
    stream: require.resolve("stream-browserify"),
    querystring: require.resolve("querystring-es3"),
    child_process: false,
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
      resource.request = resource.request.replace(/^node:/, "");
    })
  );
  config.plugins.push(new Dotenv());
  return config;
};
