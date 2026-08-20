<template>
  <div class="layout-padding">
    <h3>详情页：{{ $route.query.name || $route.query.id }}</h3>
    <p style="color: #909399; font-size: 12px">「返回(恢复)」走 history.back → 触发 popstate → 列表恢复筛选和分页；「菜单式进入(重置)」走 push → 列表重置。</p>
    <el-button type="primary" @click="goBack">返回(恢复)</el-button>
    <el-button @click="goPush">菜单式进入(重置)</el-button>
  </div>
</template>

<script setup lang="ts" name="detailDemo">
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()
const goPush = () => router.push('/demo-list')
</script>
