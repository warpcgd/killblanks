module.exports = {
  base: '/killblanks/',
  title: 'Killblanks',
  theme: 'antdocs',
  description: 'prerender + skeletonScreen A solution to the white screen of the page',
  head: [['link', { rel: 'stylesheet', href: '/css/style.css' }]],
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'Killblanks',
      description: 'prerender + skeletonScreen A solution to the white screen of the page'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Killblanks',
      description: 'prerender + skeletonScreen A solution to the white screen of the page'
    }
  },
  themeConfig: {
    backToTop: true,
    logo: '/imgs/docs-logo.png',
    locales: {
      // 键名是该语言所属的子路径
      // 作为特例，默认语言可以使用 '/' 作为其路径。
      '/': {
        lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        title: 'Killblanks',
        description: 'prerender + skeletonScreen A solution to the white screen of the page',
        nav: [
          {
            text: 'Guide',
            link: '/guides/'
          },
          {
            text: 'Demos',
            link: '/demos/'
          },
          {
            text: 'Docs',
            ariaLabel: 'Docs',
            items: [
              { text: '@killblanks/prerender', link: '/documents/prerender' },
              { text: '@killblank/skeleton', link: '/documents/skeleton' }
            ]
          },
          { text: 'Github', link: 'https://github.com/warpcgd/killblanks' }
        ],
        sidebar: [
          ['/guides/', '@killblanks'],
          ['/guides/prerender/', '@killblanks/prerender'],
          ['/guides/skeleton-ext/', '@killblanks/skeleton-ext']
        ]
      },
      '/en/': {
        lang: 'en-US',
        title: 'Killblanks',
        description: 'prerender + skeletonScreen A solution to the white screen of the page',
        nav: [
          {
            text: 'Guide',
            link: '/en/guides/'
          },
          {
            text: 'Demos',
            link: '/en/demos/'
          },
          {
            text: 'Docs',
            ariaLabel: 'Docs',
            items: [
              { text: '@killblanks/prerender', link: '/en/documents/prerender' },
              { text: '@killblank/skeleton', link: '/en/documents/skeleton' }
            ]
          },
          { text: 'Github', link: 'https://github.com/warpcgd/killblanks' }
        ],
        sidebar: [
          ['/en/guides/', '@killblanks'],
          ['/en/guides/prerender/', '@killblanks/prerender'],
          ['/en/guides/skeleton-ext/', '@killblanks/skeleton-ext']
        ]
      }
    }
  },
  chainWebpack(config, isServer) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-html5-embed'), {
        html5embed: {
          useImageSyntax: true,
          useLinkSyntax: false
        }
      })
    }
  }
}
