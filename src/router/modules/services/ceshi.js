export default {
  path: 'ceshiindex',
  name: 'ceshiindex',
  component: resolve => System.import('src/page/blankPage/ceshiindex'),
  children: [
    {
      path: '/ceshi1',
      name: 'ceshi1',
      component: resolve => System.import('src/page/ceshi/ceshi1')
    }
  ]
}
