module.exports = {
  base: '/killblanks/',
  title: 'killblanks',
  description: 'killblanks',
  themeConfig: {
    nav: [{
        text: 'Home',
        link: '/'
      },
      // {
      //   text: 'Demos',
      //   link: '/demos/'
      // },
      // {
      //   text: 'Docs',
      //   link: '/docs'
      // },
      // {
      //   text: 'Guide',
      //   link: '/guide'
      // }
    ],
    sidebar: {
        '/demos/': [
          '',     /* /foo/ */
          'Skeleton'  /* /foo/one.html */
        ]
      }
    }
}
