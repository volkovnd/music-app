/** @type {import("@vue/cli-service").ProjectOptions} */
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,

  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
  },

  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['process.env'] = args[0]['process.env'] || {};

      Object.assign(args[0]['process.env'], {
        SPOTIFY_CLIENT_ID: JSON.stringify(process.env.SPOTIFY_CLIENT_ID),
        SPOTIFY_CLIENT_SECRET: JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET),
      });

      return args;
    });

    config.performance.hints(config.mode === 'production' ? 'warning' : false);
  },

  configureWebpack: (config) => {
    config.devtool = (config.mode === 'production' ? false : 'source-map');
  },

  devServer: {
    logLevel: 'silent',
    transportMode: 'ws',
    clientLogLevel: 'none',
    compress: true,
    hot: true,
    quiet: false,
    before(app) {
      app.use((req, res, next) => {
        res.set('Access-Control-Allow-Origin', '*');

        next();
      });
    },
  },
};
