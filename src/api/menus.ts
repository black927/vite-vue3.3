// import request from '@/utils/request'
const menusMap = {
  '1': [
    {
      id: '1',
      label: '人群智库',
      path: '',
      name: '',
      meta: { title: '人群智库' },
      children: [
        {
          id: '1-1',
          label: '用户群体',
          path: '/user-tower',
          name: 'user-tower',
          meta: { title: '用户群体' },
        },
        {
          id: '1-2',
          label: '人群洞察',
          path: '/crowd-insight',
          name: 'crowd-insight',
          meta: { title: '人群洞察' },
        },
      ],
    },
    {
      id: '2',
      label: '标签管理',
      path: '',
      name: '',
      meta: { title: '标签管理' },
      children: [
        {
          id: '2-1',
          label: '用户标签',
          path: '/user-label',
          name: 'user-label',
          meta: { title: '用户标签' },
        },
      ],
    },
  ],
  '2': [
    {
      id: '1',
      label: '人群智库',
      path: '',
      name: '',
      meta: { title: '人群智库' },
      children: [
        {
          id: '1-1',
          label: '用户群体',
          path: '/commercial/cdp/user-tower',
          name: 'commercial-cdp-user-tower',
          meta: { title: '用户群体' },
        },
        {
          id: '1-2',
          label: '人群洞察',
          path: '/commercial/cdp/crowd-insight',
          name: 'commercial-cdp-crowd-insight',
          meta: { title: '人群洞察' },
        },
      ],
    },
    {
      id: '2',
      label: '标签管理',
      path: '',
      name: '',
      meta: { title: '标签管理' },
      children: [
        {
          id: '2-1',
          label: '用户标签',
          path: '/commercial/cdp/user-label',
          name: 'commercial-cdp-user-label',
          meta: { title: '用户标签' },
        },
      ],
    },
    // {
    //   id: '4',
    //   label: '用户',
    //   path: '',
    //   name: '',
    //   meta: { title: '用户' },
    //   children: [
    //     {
    //       id: '4-1',
    //       label: '用户管理',
    //       path: '/user-manages',
    //       name: 'user-manages',
    //       meta: { title: '用户管理' },
    //     },
    //     {
    //       id: '4-2',
    //       label: '分组管理',
    //       path: '/user-groups',
    //       name: 'user-groups',
    //       meta: { title: '分组管理' },
    //     },
    //   ],
    // },
    {
      id: '5',
      label: '报表中心',
      path: '/report-center',
      name: 'report-center',
      meta: { title: '报表中心', link: '/home/index' },
    },
    {
      id: '6',
      label: 'ABTest',
      path: '',
      name: '',
      meta: { title: 'ABTest' },
      children: [
        {
          id: '6-1',
          label: '应用管理',
          path: '/app-manage',
          name: '/app-manage',
          meta: { title: '应用管理' },
        },
        {
          id: '6-2',
          label: '实验管理',
          path: '/experiment-manage-list',
          name: 'experiment-manage-list',
          meta: { title: '实验管理' },
        },
      ],
    },
  ],
  '3': [
    {
      id: '1',
      label: 'PC数据看板',
      path: '',
      name: '',
      meta: { title: 'PC数据看板' },
      children: [
        {
          id: '1-1',
          label: '区域日报',
          path: '/data-portal/regional-daily',
          name: 'data-portal-regional-daily',
          meta: { title: '区域日报' },
        },
      ],
    },
  ],
}
export const getUserMenus = (data: '1' | '2' | '3') => {
  // return request({
  //   url: '/menus',
  //   method: 'post',
  // })
  console.log('xxxx', data)
  return new Promise<any>((resolve) => {
    resolve({
      code: 200,
      data: menusMap[data],
      msg: '请求成功',
      traceId: Date.now().toString(),
    })
  })
}

export type PlatformType = '1' | '2' | '3'
