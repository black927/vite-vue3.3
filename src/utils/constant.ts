export interface EnvConfig {
  label: string // 环境名称
  value: string // 环境地址
  dataPortalUrl: string // 数据门户地址
  commRedirectUrl: string // 商业化重定向地址
  abTestUrl: string // AB测试地址
  userTower: string // 标签平台地址
  dataDashboardWeb: string // PC数据看板地址
  disabled?: boolean // 是否禁用
  preview?: string // 预览地址
}

export const ENV_CONFIG: EnvConfig[] = [
  {
    label: '本地',
    value: 'http://192.168.240.99:3012/user-tower/auth-redirect',
    preview: 'http://localhost:4173/user-tower/auth-redirect',
    dataPortalUrl: 'http://localhost:3014/transfer.html#',
    commRedirectUrl: 'https://web-dev.shuxinyc.shop/#/login',
    abTestUrl: 'http://localhost:3014/abtest-web/transfer.html#/auth-redirect',
    userTower: 'http://192.168.240.99:3012/user-tower/auth-redirect',
    dataDashboardWeb: 'http://192.168.240.255:3013/data-dashboard-web',
  },
  {
    label: '开发',
    value: 'https://cdp-dev.shuxinyc.shop/user-tower/auth-redirect',
    dataPortalUrl: 'https://data-portal-dev.shuxinyc.shop/transfer.html#',
    commRedirectUrl: 'https://web-dev.shuxinyc.shop/#/login',
    abTestUrl: 'https://abtest-mng-dev.shuxinyc.shop/abtest-web/transfer.html#/auth-redirect',
    userTower: 'https://usertower-dev.shuxinyc.com/user-tower/auth-redirect',
    dataDashboardWeb: 'https://datadashboard-dev.shuxinyc.com/data-dashboard-web',
  },
  {
    label: '测试',
    value: 'https://cdp-qa.shuxinyc.shop/user-tower/auth-redirect',
    dataPortalUrl: 'https://data-portal-qa.shuxinyc.shop/transfer.html#',
    commRedirectUrl: 'https://web-test.shuxinyc.shop/#/login',
    abTestUrl: 'https://abtest-mng-qa.shuxinyc.shop/abtest-web/transfer.html#/auth-redirect',
    userTower: 'https://usertower-qa.shuxinyc.com/user-tower/auth-redirect',
    dataDashboardWeb: 'https://datadashboard-uat.shuxinyc.com/data-dashboard-web',
  },
  {
    label: '生产',
    value: 'https://cdp.shuxinyc.shop/user-tower/auth-redirect',
    dataPortalUrl: 'https://data-portal.shuxinyc.shop/transfer.html#',
    commRedirectUrl: 'https://web.shuxinyc.shop/#/login',
    abTestUrl: 'https://abtest-mng.shuxinyc.shop/abtest-web/transfer.html#/auth-redirect',
    userTower: 'https://usertower.shuxinyc.com/user-tower/auth-redirect',
    dataDashboardWeb: 'https://datadashboard.shuxinyc.com/data-dashboard-web',
    disabled: true,
  },
]

export const THEMES = [
  {
    name: '主题1',
    key: '1',
    colors: {
      brand: {
          '1': 'rgba(1, 77, 161, .1)',
          '2': 'rgba(1, 77, 161, .3)',
          '3': 'rgba(1, 77, 161, .45)',
          '4': 'rgba(1, 77, 161, .7)',
          '5': '#014DA1',
      },
    },
  },
  {
    name: '主题2',
    key: '2',
    colors: {
      brand: {
          '1': '#0a4cde1A',
          '2': '#0a4cde4D',
          '3': '#0a4cde73',
          '4': '#0a4cdeBF',
          '5': '#0a4cde',
      },
    },
  },
]
