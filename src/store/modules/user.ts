import { defineStore } from 'pinia'
import { MenuListItem } from '@/utils/interface'
import userSvg from '@/assets/svg/user.svg'
import type  { PlatformType } from '@/api/menus'
const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    phoneNumber: '', // 手机号
    menuList: [] as MenuListItem[],
    menuListMap: {} as Record<PlatformType, MenuListItem[]>,
    name: '',
    avatar: '', // 头像
    groupId: '', // 集团id
    brandId: '', // 品牌id
    brandName: '', // 品牌名称
    env: {} as { label: string; value: string; dataPortalUrl: string; commRedirectUrl: string; abTestUrl: string; userTower: string },
    brandList: [] as { lable: string, value: any, icon: string }[], // 品牌列表
    platform: '2' as PlatformType, // 对接平台
  }),
  actions: {
    // 登录
    login(userInfo: any) {
      this.name = userInfo.userName
      this.avatar = userSvg
    },
    setBrand(brandId: string, brandName: string) {
      this.brandId = brandId
      this.brandName = brandName
    },
    setUserInfo({ env, phoneNumber, menuList, menuListMap, token, groupId }: any) {
      this.env = env
      this.phoneNumber = phoneNumber
      this.menuList = menuList
      this.menuListMap = menuListMap
      this.token = token
      this.groupId = groupId
    },
    getUserInfo() {
      return { phoneNumber: this.phoneNumber, authInsight: this.authInsight }
    },
    // 设置品牌列表
    setBrandList(data: { lable: string, value: any, icon: string }[]) {
      this.brandList = data
      data[0] && this.setBrand(data[0].value, data[0].lable)
    },
    setPlatform(data: any) {
      this.platform = data
    },
  },
  persist: true,
})

export default useUserStore
