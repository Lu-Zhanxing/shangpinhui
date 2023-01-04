<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
import '@/mock/mockSever.js'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch("categoryList");
  },
}
</script>

<style lang="less">
// 解决支付页面使用element-ui弹出层的时候页面抖动的问题
body{
  overflow: hidden;
  padding-right: 0!important;
}
</style>
