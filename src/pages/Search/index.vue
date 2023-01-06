<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级导航选项 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键词 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌信息 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 参数属性 -->
            <li class="with-x" v-for="(attrItem,index) in searchParams.props" :key="index">{{attrItem.split(":")[1]}}<i @click="removeAttrItem(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :attrsList="attrsList" :trademarkList="trademarkList" @getTrademarkInfo="getTrademarkInfo" @getAttrInfo="getAttrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <!-- 排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{'active':isOne}" @click="changeOrder('1')">
                  <a>综合<span class="iconfont" :class="{'icon-arrowdown':isDesc,'icon-arrowup':isAsc}" v-show="isOne"></span></a>
                </li>
                <li :class="{'active':isTwo}" @click="changeOrder('2')">
                  <a>价格<span class="iconfont" :class="{'icon-arrowdown':isDesc,'icon-arrowup':isAsc}" v-show="isTwo"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img" @click="toDetail(goods.id)">
                    <!-- <a><img :src="goods.defaultImg" /></a> -->
                    <a><img v-lazy="goods.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination :pageNo="searchParams.pageNo" :total="total" :pageSize="searchParams.pageSize" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters,mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      },
    };
  },
  beforeMount() {
    // Object.assign(this.searchParams,this.$route.query,this.$route.params)
    
  },
  mounted() {
    // this.getSearchList()
  },
  computed: {
    ...mapGetters(["attrsList", "goodsList", "trademarkList"]),
    ...mapState({
      total: (state) => state.search.searchList.total
    }),
    // 判断是不是综合排序
    isOne(){
      return this.searchParams.order.includes("1")
    },
    // 判断是不是价格排序高亮
    isTwo(){
      return this.searchParams.order.includes("2")
    },
    // 判断是否是降序
    isAsc(){
      return this.searchParams.order.includes("asc")
    },
    // 判断是否是升序
    isDesc(){
      return this.searchParams.order.includes("desc")
    },
  },
  methods: {
    getSearchList(){
      this.$store.dispatch("searchList", this.searchParams);
    },
    removeCategoryName(){
      // 点击的时候将面包屑标签名称置为undefined（和置为空相比，undefined数据发请求时不会传给后台）
      this.searchParams.categoryName = undefined

      this.$router.push({
        name: "search",
        params: this.$route.params || undefined
      })
      // this.getSearchList()
    },
    removeKeyword(){
      // 点击的时候将面包屑标签名称置为undefined（和置为空相比，undefined数据发请求时不会传给后台）
      this.searchParams.keyword = undefined

      this.$router.push({
        name: "search",
        query: this.$route.query || undefined
      })

      this.$bus.$emit('clearKeyword')
    },

    //自定义事件获取子组件传过来的品牌数据
    getTrademarkInfo(trademarkInfo){
      this.searchParams.trademark = `${trademarkInfo.tmId}:${trademarkInfo.tmName}`
      this.getSearchList()
    },

    removeTrademark(){
      this.searchParams.trademark = undefined
      this.getSearchList()
    },

    //自定义事件获取子组件传过来的参数属性
    getAttrInfo(attr,attrVal){
      let props = `${attr.attrId}:${attrVal}:${attr.attrName}`
      // 如果数组中没有此条数据，push进去
      if(!this.searchParams.props.includes(props)){
        this.searchParams.props.push(props)
        this.getSearchList()
      }
    },

    removeAttrItem(index){
      this.searchParams.props.splice(index,1)
      this.getSearchList()
    },

    // 切换排序标签
    changeOrder(flag){
      let originOrder = this.searchParams.order
      let originFlag = originOrder.split(":")[0]
      let originSort = originOrder.split(":")[1]
      let currentOrder = ''
      if(originFlag == flag){
        currentOrder = `${flag}:${originSort=='desc'?'asc':'desc'}`
      }else{
        currentOrder = `${flag}:${'desc'}`
      }
      this.searchParams.order = currentOrder
      this.getSearchList()
    },
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo
      this.getSearchList()
    },

    // 点击图片跳转到详情页面
    // 注意：这里没跟老师一样用声明式路由导航，是因为如果遍历内容太多，每次都要声明router-link，影响性能
    toDetail(goodId){
      // 注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置
      this.$router.push({
        name:'detail',
        params:{goodId:goodId}
      })
      // 如果使用path配置的话，需要在path直接传参数形式，就不用单独传params参数了
      // this.$router.push({
      //   path:`/detail/${goodsId}`
      // })
    }
  },
  watch:{
    $route:{
      handler(newVal,oldVal){
        //注意：这里需要清空一下category1（2、3）Id的值，如果不清空的话，点击左侧三级导航栏的时候可能会带上之前的请求条件
        this.searchParams.category1Id = '',
        this.searchParams.category2Id = '',
        this.searchParams.category3Id = '',
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        this.getSearchList()
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>