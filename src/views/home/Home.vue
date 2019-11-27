<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control class="tab-control"
				:titles="['流行','新款', '精选']"
				@tabClick="tabClick"
				ref="tabControl1"
				
				v-show="isTabFixed"
		 ></tab-control>
		<scroll class="content" ref="scroll"
			:pull-up-load="true" @pullingUp="loadMore"
		 :probe-type="3" @scroll="contentScroll">
			<home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"/>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-control class="tab-control"
					:titles="['流行','新款', '精选']"
					@tabClick="tabClick"
					ref="tabControl2"
					:class="{fixed:isTabFixed}"
			 ></tab-control>
			<good-list :goods="showGoods"></good-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShow"></back-top>
		
		
	</div>
</template>

<script>
	
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from'./childComps/RecommendView'
	import FeatureView from'./childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from'components/content/tabControl/TabControl'
	import GoodList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'
	import BackTop from 'components/content/backTop/BackTop'
	
	
	import { getHomeMultidata, getHomeGoods } from "network/home"
	import {debounce} from "common/utils"
	
	
	export default{
		name:"Home",
		components:{
			
			HomeSwiper,
			RecommendView,
			FeatureView,
			
			NavBar,
			TabControl,
			GoodList,
			Scroll,
			BackTop
			
		},
		data(){
			return{
				// results:null
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},
				},
				currentType:'pop',
				isShow:false,
				tabOffsetTop:646,
				isTabFixed:false,
				saveY:0,
				itemImgListener:null
			}
		},
		
		created() {
			//1.请求多个数据
			this.getHomeMultidata()
			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
			//3.赋值
			
			
		},
		mounted(){
			
			const refresh =debounce(this.$refs.scroll.refresh,100)
			
			//
			this.itemImgListener=()=>{
				// console.log('自定义$bus')
				refresh()
				
			}
			this.$bus.$on('itemImgLoad',this.itemImgListener)
			
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		activated(){
			
			this.$refs.scroll.scroll.refresh()
			this.$refs.scroll.scrollTo(0,this.saveY,0)
// 			console.log(this.saveY)
// 			console.log('---')
// 			console.log(this.$refs.scroll.scroll.y)
		},
		deactivated(){
			this.saveY =this.$refs.scroll.scroll.y
			// console.log(this.saveY)
			// console.log(this.$refs.scroll.scroll.y)
			//取消全局事件监听
			this.$bus
		},
		methods:{
			// 事件监听
				
				tabClick(index){
					switch(index){
						case 0:
						this.currentType='pop';
						break;
						case 1:
						this.currentType='new';
						break;
						case 2:
						this.currentType='sell';
						break;
					}
					this.$refs.tabControl1.currentIndex = index;
					this.$refs.tabControl2.currentIndex = index;
				},
				backClick(){
					// console.log('点击')
					this.$refs.scroll.scrollTo(0,0)
				},
				contentScroll(position){
					// console.log(position)
					this.isShow = -(position.y)>1500
					
					//1.吸顶
					this.isTabFixed = -(position.y)>this.tabOffsetTop
					
				},
				loadMore(){
					// console.log('下一页正在加载中。。。')
					this.getHomeGoods(this.currentType)
				},
				getHomeMultidata(){
					getHomeMultidata().then((res)=>{
						// console.log(res);
						// this.results=res;
						this.banners = res.data.banner.list;
						this.recommends = res.data.recommend.list;
					})
				},
				getHomeGoods(type){
					const page = this.goods[type].page + 1
					getHomeGoods(type, page).then(res =>{
						this.goods[type].list.push(...res.data.list)
						this.goods[type].page +=1
						//解决只完成一次上拉加载
						this.$refs.scroll.scroll.finishPullUp()
					})
				},
					//.offsetTop
						swiperImageLoad(){
							this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
							// console.log(this.$refs.tabControl2.$el.offsetTop)
				},
		}
	}
</script>
	
<style scoped>
	#home{
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color:var(--color-tint);
		color: #fff;
		position: fixed;
		left:0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	.tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
		
	}
	.content{
		/* height: 300px; */
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
	}
	.tab-control2{
		position: fixed;
		left:0;
		right:0;
		top:44px;
	}
	/* .content{
		
		height:calc(100%-93px);
		overflow: hidden;
		margin-top: 44px;
	} */
</style>
