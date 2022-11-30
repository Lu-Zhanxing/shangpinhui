<template>
  <div>我是Search组件
    <h3>params参数---{{$route.params.keywords}}</h3>
    <h3>query参数---{{$route.query}}</h3>
  </div>
  
</template>

<script>
export default {
    name:'Search'
}
</script>

<style>

</style>