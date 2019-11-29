<template>
	<div>
		<!-- 导航 -->
		<nav-bar class="cart">
			<div slot="center">购物车({{cartCount}})</div>
		</nav-bar>
		<!-- 列表 -->
		<cart-list></cart-list>
		<!-- 底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
	</div>
	
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import CartList from './childComps/CartList'
	import CartBottomBar from './childComps/CartBottomBar'
	
	import { mapGetters } from 'vuex'
	export default{
		name:"Cart",
		num:2,
		components:{
			NavBar,
			CartList,
			CartBottomBar
		},
		computed:{
			...mapGetters([
				'cartList',
				'cartCount'
			])
		}
	}
</script>

<style scoped="">
	.cart{
		font-weight:500 ;
		background-color: var(--color-tint);
		color: #fff;
		
		
		
	}
	
</style>
