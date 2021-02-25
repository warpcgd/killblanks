module.exports = {
  base: '/killblanks/',
  title: 'Killblanks',
  theme: 'antdocs',
  description: 'killblanks',
  themeConfig: {
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: 'Demos',
        link: '/demos/'
      },
      {
        text: 'Docs',
        link: '/docs'
      },
      {
        text: 'Guide',
        link: '/guide'
      }
    ],
    sidebar: {
        '/demos/': [
          '',     /* /foo/ */
          'Basic'  /* /foo/one.html */
        ]
      }
    },
    chainWebpack (config, isServer) {
      config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
    }
}
