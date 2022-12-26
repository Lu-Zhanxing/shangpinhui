<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" :class="{'active':pageNo==1}" @click="$emit('getPageNo',1)">1</button>

    <button v-if="startNumAndEndNum.start > 2">···</button>


    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" :class="{'active':pageNo==page}" @click="$emit('getPageNo',page)">{{page}}</button>

    <button v-if="startNumAndEndNum.end < totalPage-1">···</button>

    <button v-if="startNumAndEndNum.end < totalPage" :class="{'active':pageNo==totalPage}"
    @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','total','pageSize','continues'],
    computed: {
      // 计算总页数
      totalPage(){
          return Math.ceil(this.total/this.pageSize)
      },
      // 计算中间连续的起始和结束页数
      startNumAndEndNum() {
        const {pageNo,total,pageSize,continues,totalPage} = this
        let start = 0
        let end = 0
        if(continues > totalPage){
          start = 1
          end = totalPage
        }else{
          // 注意：这里和老师讲的写的代码不一样，但是结果是对的，可随时查看老师咋写的换种思路
          if(pageNo < Math.ceil(continues/2)){
            start = 1
            end = continues
          }else if(pageNo > totalPage-Math.ceil(continues/2)){
            start = totalPage - continues + 1
            end = totalPage
          }else{
            start = pageNo - Math.floor(continues/2)
            end = pageNo + Math.floor(continues/2)
          }
        }
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>