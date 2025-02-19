import type { MenuListItem, SFCWithInstall } from './interface'

/**
 * 数据是否为空
 * @param {any} value
 * @returns Boolean
 */
export function isEmpty(value: any) {
  if (value == null) return true
  switch (toString.call(value)) {
    case '[object Array]':
    case '[object Arguments]':
    case '[object String]':
      return !value.length
    case '[object Object]':
      return !Reflect.ownKeys(value).length
    case '[object Map]':
    case '[object Set]':
      return !value.size
  }
  return false
}

/**
 * 根据 object对象的path路径获取值
 * @param {Object} object 对象
 * @param {Array<any> | string} path 输入的路径
 * @param {any} defaultValue 默认值
 * @param {string} suffixValue 后缀
 * @returns {*} 返回解析的值
 */
export function get(object: Object, path: Array<any> | string, defaultValue?: any, suffixValue?: string) {
  let result
  if (typeof object === 'object' && object !== null) {
    const newPath = Array.isArray(path) ? path : path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
    result = newPath.reduce((o: any, k) => {
      return (o || {})[k]
    }, object)
  } else {
    result = object
  }
  return result === undefined || result === null ? defaultValue : suffixValue ? result + suffixValue : result
}

export function authRouter(treeData: MenuListItem[], path: string) {
  let res
  const data = (value: MenuListItem[]) => {
    value.forEach((v) => {
      if (v.path === path) {
        res = v
      } else {
        data(v.children || [])
      }
    })
  }
  data(treeData)
  return res
}

export function withInstall<T, E extends Record<string, any>>(main: T, extra?: E) {
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) app.component(comp.name, comp)
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) (main as any)[key] = comp
  }
  return main as SFCWithInstall<T> & E
}

// 表单重置
export function resetForm(refName: string) {
  if (this.$refs[refName]) this.$refs[refName].resetFields()
}

/**
 * 处理路径
 * @param {string} p
 * @returns 返回正确路径
 */
export function getNormalPath(p: string) {
  if (p.length === 0 || !p || p === 'undefined') return p

  const res = p.replace('//', '/')
  if (res[res.length - 1] === '/') return res.slice(0, res.length - 1)

  return res
}

/**
 * 根据下载链接下载文件
 * @param {string} url
 */
export function downloadFile(url: string) {
  const aLink = document.createElement('a')
  aLink.href = url
  aLink.click()
}

/**
 * 将参数处理成字符串
 * @param {any} params 参数
 * @returns {string} 处理后的字符串
 * @example
 * stringifyParams({name: 'chacha', age: 1}) // name=chacha&age=1
 */
export function stringifyParams(params: any) {
  let result = ''
  if (typeof params !== 'object' || params === null) {
    if (typeof params === 'string') return params
    return ''
  }
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (typeof value !== 'undefined') {
      if (typeof value === 'object' && value !== null) {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(params)}=`
            result += `${subPart + encodeURIComponent(value[key])}&`
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  return result.slice(0, result.length - 1)
}
