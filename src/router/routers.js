import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },

  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      // 参数管理

      {
        path: 'sysDictionary',
        name: 'sysDictionary',
        meta: {
          icon: 'md-funnel',
          title: '参数字典'
        },
       component: () => import('@/view/multilevel/sysDictionary/sysDictionary.vue'),
      },{
        path: 'add_sysDictionary',
        name: 'add_sysDictionary',
        meta: {
          icon: 'md-funnel',
          title: '字典新增',
          notCache: true,
          hideInMenu: true
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import ('@/view/multilevel/sysDictionary/add_sysDictionary')
      },
      {
        path: 'edit_sysDictionary',
        name: 'edit_sysDictionary',
        meta: {
          icon: 'md-funnel',
          title: '字典修改',
          notCache: true,
          hideInMenu: true
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import ('@/view/multilevel/sysDictionary/edit_sysDictionary')
      },
      // 部门管理
      {
        path: 'dep',
        name: 'dep',
        meta: {
          icon: 'md-funnel',
          title: '部门字典'
        },
        component: () => import('@/view/multilevel/department/dep.vue'),
      },{
        path: 'add_dep',
        name: 'add_dep',
        meta: {
          icon: 'md-funnel',
          title: '部门新增',
          notCache: true,
          hideInMenu: true
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import ('@/view/multilevel/department/add_dep')
      },
      {
        path: 'edit_dep',
        name: 'edit_dep',
        meta: {
          icon: 'md-funnel',
          title: '字典修改',
          notCache: true,
          hideInMenu: true
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import ('@/view/multilevel/department/edit_dep')
      },

      // 用户管理
      {
        path: 'user',
        name: 'user',
        meta: {
          icon: 'md-funnel',
          title: '用户管理'
        },
        component: () => import('@/view/multilevel/user/user.vue'),
      },{
        path: 'add_user',
        name: 'add_user',
        meta: {
          icon: 'md-funnel',
          title: '用户新增',
          notCache: true,
          hideInMenu: true
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import ('@/view/multilevel/user/add_user')
      },
      {
        path: 'edit_user',
        name: 'edit_user',
        meta: {
          icon: 'md-funnel',
          title: '用户修改',
          notCache: true,
          hideInMenu: true
          // beforeCloseName: 'before_close_normal'
        },
        component: () => import ('@/view/multilevel/user/edit_user')
      },



      {
        path: 'level_2_2',
        name: 'level_2_2',
        showAlways: true,
        meta: {
          icon: 'md-funnel',
          title: '二级-2',
          showAlways: true,
        },
        component: parentView,
       children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/sysDictionary/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  }
]
