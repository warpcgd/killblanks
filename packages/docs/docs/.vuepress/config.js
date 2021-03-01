module.exports = {
  base: '/killblanks/',
  title: 'Killblanks',
  theme: 'antdocs',
  description: 'killblanks',
  head: [['link', { rel: 'stylesheet', href: '/css/style.css' }]],
  themeConfig: {
    backToTop: true,
    logo: '/imgs/docs-logo.png',
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Demos',
        link: '/demos/'
      },
      {
        text: 'Docs▾',
        ariaLabel: 'Docs',
        items: [
          { text: '@killblank/prerender', link: '/documents/prerender' },
          { text: '@killblank/skeleton', link: '/documents/skeleton' }
        ]
      },
      {
        text: 'Guide',
        link: '/guides/'
      }
    ],
    sidebar: [
      ['/guides/', '@killblanks'],
      ['/guides/prerender/', '@killblanks/prerender'],
      ['/guides/skeleton-ext/', '@killblanks/skeleton-ext']
    ]
  },
  chainWebpack(config, isServer) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
  }
}
