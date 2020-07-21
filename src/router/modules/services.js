import ceshi from './services/ceshi'
import mycollect from './services/mycollect'
import home from 'src/page/home/home'
const servicesRoutes = [
  {
    path: '/',                 // 服务框架
    name: 'home',
    component: home,
    children: [
      {
        path: '/mainMenu',
        name: 'mainMenu',
        component: resolve => System.import('src/page/home/mainMenu'),
        children: [
          mycollect
        ]
      },
      {
        path: '/componentList',
        name: 'componentList',
        component: resolve => System.import('src/page/blankPage/componentList')
      },
      {
        path: '/showpage',
        name: 'showpage',
        component: resolve => System.import('src/page/blankPage/showpage')
      },
      ceshi
    ]
  }
]
export default servicesRoutes
