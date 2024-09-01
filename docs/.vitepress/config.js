module.exports = {
  title: 'M2-UI',
  description: 'M2-UI组件库',
  themeConfig: {
    lastUpdated: '上次更新',
    docsDir: 'docs',
    editLink: {
      pattern:
        'https://github.com/cuimm/vue3-components/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    editLinkText: '编辑此网站',
    repo: 'https://github.com/cuimm/vue3-components',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present M2-UI'
    },
    nav: [
      {
        text: '指南',
        link: '/m2-ui/guide/installation',
        activeMatch: '/guide/'
      },
      {
        text: '组件',
        link: '/m2-ui/components/icon',
        activeMatch: '/components/'
      }
    ],
    sidebar: {
      '/m2-ui/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/m2-ui/guide/installation' },
            { text: '快速开始', link: '/m2-ui/guide/quickStart' }
          ]
        }
      ],
      '/m2-ui/components/': [
        {
          text: '基础组件',
          items: [{ text: 'Icon', link: '/m2-ui/components/icon' }]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuimm/vue3-components' }
    ]
  }
}
