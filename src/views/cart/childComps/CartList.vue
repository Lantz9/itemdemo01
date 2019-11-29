<template>
	<div class="cart-list">
		<scroll class="content">
			<!-- <li v-for="item in cartList" class="item-list">{{item}}</li> -->
			<cart-list-item class="itemlist-item" v-for="(item,index) in cartList" :item-info="item"></cart-list-item>
			<div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				
				
			</div>
		</scroll>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Scroll from 'components/common/scroll/Scroll'
	import CartListItem from './CartListItem'
	export default{
		name:"CartList",
		computed:{
			...mapGetters(['cartList'])
		},
		components:{
			Scroll,
			CartListItem
		},
		activated(){
			// this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped="">
	.content{
		height: 100vh;
		overflow: hidden;
	}
	.item-list{
		
	}
	.itemlist-item{
		font-size: 40px;
	}
</style>
