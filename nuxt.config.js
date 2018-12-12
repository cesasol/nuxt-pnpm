const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
  ],

  /*
   ** Build configuration
   */
  build: {
    // Parallel and cache doesn't work, and I don't know why
    // parallel: true,
    // cache: true,
    babel: {
      presets: ({ isServer }) => [
        [
          require.resolve('@nuxt/babel-preset-app'),
          {
            buildTarget: isServer ? 'server' : 'client',
            // Incluir polyfills globales es mejor que no hacerlo
            useBuiltIns: 'entry', // for 'usage' see bellow
            // Un poco menos de código a cambio de posibles errores
            loose: true, // A little personal but good
            // Nuxt quiere usar ie 9, yo no.
            targets: isServer ? { node: 'current' } : {},
          },
        ],
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        // Si usas useBuiltIns: usage, descomenta el sig código
        // [
        //   '@babel/plugin-transform-runtime',
        //   {
        //     regenerator: true,
        //   },
        // ],
      ],
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, {
      isDev,
      isClient
    }) {
      // fix pnpm
      const babelLoader = config.module.rules.find(
        rule => rule.test.toString() === /\.jsx?$/.toString()
      )
      babelLoader.use[0].loader = require.resolve('babel-loader')
      // Run ESLINT on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules(?!\/buefy)$/,
        })
      }
      return config
    },
  }
}
