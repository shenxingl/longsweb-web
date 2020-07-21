export default {
  path: 'collectindex',
  name: 'collectindex',
  component: resolve => System.import('src/page/blankPage/collectindex'),
  children: [
    {
      path: '/filelist',
      name: 'filelist',
      component: resolve => System.import('src/page/mycollect/filelist')
    },{
      path: '/urlcollect',
      name: 'urlcollect',
      component: resolve => System.import('src/page/mycollect/urlcollect')
    }
  ]
}
