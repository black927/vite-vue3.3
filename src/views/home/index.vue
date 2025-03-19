<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import useStoreUser from '@/store/modules/user'
import { MenuListItem } from '@/utils/interface'
import { type PlatformType, getUserMenus } from '@/api/menus'
import { getUserInfo } from '@/api/user'
import { ENV_CONFIG } from '@/utils/constant'
import tea from '@/assets/images/tea.png'
import coffee from '@/assets/images/coffee.png'
import liyubai from '@/assets/images/liyubai.jpg'
const defaultProps = {
  children: 'children',
  label: 'label',
}

const treeRef = ref()
const storeUser = useStoreUser()
const router = useRouter()
const treeData = ref<MenuListItem[]>([])
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  env: storeUser.env?.label ? storeUser.env : ENV_CONFIG[0],
  phoneNumber: storeUser.phoneNumber || '18228329236',
  token: storeUser.token,
  groupId: '267356',
  menuList: [],
})
const activeName = ref<PlatformType>(storeUser.platform)

const validateName = (_rule: any, value: any, callback: any) => {
  const reg = /^1[3-9]\d{9}$/
  if (value === '') callback(new Error('请输入手机号'))
  else if (!reg.test(value)) callback(new Error('请输入正确手机号'))
  else callback()
}
const rules = reactive({
  env: [{ required: true, message: '请选择' }],
  phoneNumber: [{ required: true, validator: validateName }],
  token: [{ required: true, message: '请输入token' }],
  groupId: [{ required: true, message: '请输入集团id' }],
})
getUserInfo().then((res) => {
  storeUser.login(res.data)
})
const init = () => {
  getUserMenus(activeName.value).then((res) => {
    treeData.value = res.data
  })
}
const brandListMap = {
  '1': [
    { lable: '茶百道', value: 'tea', icon: tea },
    { lable: '咖灰', value: 'coffee', icon: coffee },
  ],
  '2': [{ lable: '李与白', value: '351503', icon: liyubai }],
  '3': [{ lable: '茶百道', value: 'tea', icon: tea }],
}
watchEffect(() => {
  init()
  storeUser.setPlatform && storeUser.setPlatform(activeName.value)
  storeUser.setBrandList && storeUser.setBrandList(brandListMap[activeName.value])
})
const getData = (values: string[]) => {
  const filterData = treeData.value.filter((v) => {
    const a = values.includes(v.id)
    const b = v.children?.some(vv => values.includes(vv.id))
    return !a && !b ? false : true
  })
  return filterData.map((v) => {
    return {
      ...v,
      children: v.children?.filter(vv => values.includes(vv.id)),
    }
  })
}
const getCheckedKeys = () => {
  let res: string[] = []
  const execute = (data: MenuListItem[], is: boolean) => {
    (data || []).forEach((v) => {
      if (is || !v.children || !v.children.length) res.push(v.id)
      if (v.children) execute(v.children, true)
    })
  }
  // execute(storeUser.menuList, false)
  execute(storeUser.menuListMap[activeName.value], false)
  return res.length ? res : ['1', '2', '3', '4', '5']
}
const go = (formEl: FormInstance | undefined, type: '1' | '2') => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const values = treeRef.value.getCheckedKeys()
      const menuListMap = storeUser.menuListMap
      menuListMap[activeName.value] = getData(values)
      storeUser.setUserInfo({
        ...ruleForm.value,
        menuList: getData(values),
        menuListMap,
      })
      if (type === '1') {
        router.push(`/label-tank`)
      } else if (type === '2') {
        router.push(`/system`)
      }
    }
  })
}

// const open = () => {
//   sessionStorage.setItem('age', '28')
//   window.open('http://192.168.125.241:5170/#/test/cascader')
// }
</script>

<template>
  <div class="home-waraper">
    <!-- <el-button type="primary" @click="open">开启新窗口</el-button> -->

    <div class="form-container w-600px">
      <h2>接入平台</h2>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="运营中台" name="1" />
        <el-tab-pane label="商业化平台" name="2" />
        <el-tab-pane label="数据门户" name="3" />
      </el-tabs>
      <el-form v-if="activeName === '1'" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
        <el-form-item prop="env" label="接入外部系统环境:">
          <el-select v-model="ruleForm.env">
            <el-option v-for="item in ENV_CONFIG" :key="item" :label="item.label" :value="item" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="用户手机号:">
          <el-input v-model="ruleForm.phoneNumber" placeholder="请输入手机号" clearable maxlength="20" />
        </el-form-item>
        <el-form-item prop="menuList" label="菜单权限:">
          <el-tree
            ref="treeRef"
            style="width: 200px"
            :data="treeData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :default-checked-keys="getCheckedKeys()"
          />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="go(ruleFormRef, '1')">跳转至标签智库</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="activeName === '2'" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
        <el-form-item prop="env" label="接入外部系统环境:">
          <el-select v-model="ruleForm.env">
            <el-option v-for="item in ENV_CONFIG" :key="item" :label="item.label" :value="item" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item prop="groupId" label="集团id:">
          <el-input v-model="ruleForm.groupId" placeholder="请输入集团id" clearable maxlength="20" disabled />
        </el-form-item>
        <el-form-item prop="token" label="商业化平台token:">
          <el-input v-model="ruleForm.token" placeholder="请输入商业化平台token" clearable />
        </el-form-item>
        <el-form-item prop="menuList" label="菜单权限:">
          <el-tree
            ref="treeRef"
            style="width: 200px"
            :data="treeData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :default-checked-keys="getCheckedKeys()"
          />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="go(ruleFormRef, '1')">跳转至商业化平台对接</el-button>
          <!-- <el-button type="primary" @click="go(ruleFormRef, '2')">跳转至内部系统</el-button> -->
        </el-form-item>
      </el-form>
      <el-form v-if="activeName === '3'" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
        <el-form-item prop="env" label="接入外部系统环境:">
          <el-select v-model="ruleForm.env">
            <el-option v-for="item in ENV_CONFIG" :key="item" :label="item.label" :value="item" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item prop="menuList" label="菜单权限:">
          <el-tree
            ref="treeRef"
            style="width: 200px"
            :data="treeData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :default-checked-keys="getCheckedKeys()"
          />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="go(ruleFormRef, '1')">跳转至数据门户</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.gao {
  color: var(--el-color-primary);
}
.el-form-item__label {
  font-weight: 700;
}
.home-waraper {
  display: flex;
  height: 100%;
  .form-container {
    margin: auto;
  }
}
</style>
