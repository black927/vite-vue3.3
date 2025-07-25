import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { THEMES } from '@/utils/constant';
const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: false,
      withoutAnimation: false,
      hide: false,
    },
    device: 'desktop',
    size: Cookies.get('size') || 'default',
    theme: THEMES[0],
  }),
  actions: {
    toggleSideBar(withoutAnimation?: { withoutAnimation: boolean }) {
      if (this.sidebar.hide) return false

      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      if (this.sidebar.opened) Cookies.set('sidebarStatus', `${1}`)
      else Cookies.set('sidebarStatus', `${0}`)
    },
    closeSideBar(withoutAnimation: { withoutAnimation: boolean }) {
      Cookies.set('sidebarStatus', `${0}`)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string) {
      this.device = device
    },
    setSize(size: string) {
      this.size = size
      Cookies.set('size', size)
    },
    toggleSideBarHide(status: boolean) {
      this.sidebar.hide = status
    },
    setTheme(theme: any) {
      this.theme = theme;
    }
  },
  persist: {
    paths: ['theme'],
  },
})

export default useAppStore
