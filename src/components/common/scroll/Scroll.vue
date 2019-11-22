<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default{
		name:"Scroll",
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				tpe:Boolean,
				default:false
			}
		},
		data(){
			return{
				scroll:null
			}
		},
		mounted() {
			//创建BScroll对象
			this.scroll =new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			//监听滚动位置
			this.scroll.on('scroll',(position)=>{
				// console.log(position)	
				this.$emit('scroll',position)
			})
			
			// console.log(this.scroll)
			this.scroll.refresh()
			//监听上拉
			this.scroll.on('pullingUp',()=>{
				// console.log('上拉加载更多')
				//自定义事件传出
				this.$emit('pullingUp')
			})
			
			
		},
		methods:{
			scrollTo(x,y,time=666){
				this.scroll.scrollTo(x,y,time)
			}
		}
	}
</script>

<style scoped>
	
</style>
