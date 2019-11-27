<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav"/>
		<scroll class="content" ref="scroll">
			<detail-swiper :topImages="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo"></detail-goods-info>
			<detail-param-info :param-info="paramInfo"></detail-param-info>
			<detail-comment-info :comment-info="commentInfo"></detail-comment-info>
			<good-list :goods="recommends"></good-list>
			<br />
			<br />
			<br />
			
		</scroll>
	</div>
	
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import {getDetail,Goods, Shop,GoodsParam,getRecommend} from 'network/detail'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import {debounce} from "common/utils"
	import {itemListenerMixin} from 'common/mixin'
	import GoodList from 'components/content/goods/GoodsList'
	
	import Scroll from 'components/common/scroll/Scroll'
	export default{
		name:"Detail",
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodList,
			Scroll,
			
		},
		mixins:[itemListenerMixin],
		data(){
			return{
				iid:null,
				// res:null
				topImages:[],
				goods:{},
				shop:{
					type:Object,
					default(){
						return {}
					}
				},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				itemImgListener:null
				
			}
		},
			
		created(){
			//保存iid
			this.iid=this.$route.params.iid
			//根据iid请求数据
			getDetail(this.iid).then((res)=>{
				// console.log(res);
				const data = res.result;
				this.topImages = res.result.itemInfo.topImages
				// console.log(this.topImages)
				
				//2获取商品信息
				this.goods =
				 new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				
				//3创建店铺信息
				this.shop = new Shop(data.shopInfo);
				
				//4获取商品详情信息
				this.detailInfo = data.detailInfo;
				
				//5获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				
				//取出评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
			})
			
			//请求推荐数据
			getRecommend().then(res=>{
				// console.log(res);
				this.recommends = res.data.list
				
			})
			
		},
		mounted(){
		},
		destroyed(){
			this.$bus.$off('itemImgLoad',this.itemImgListener)
		},
		methods:{
			imageLoad(){
				this.$refs.scroll.refresh()
			}
		}
	}
</script>

<style scoped="">
	#detail{
		position: relative;
		z-index: 9;
		background-color:#fff ;
		height: 100vh;
	}
	.content{
		height: 100vh;
		
	}
	.detail-nav{
		position: relative;
		z-index: 9;
		background-color: #fff;
		
	}
</style>
