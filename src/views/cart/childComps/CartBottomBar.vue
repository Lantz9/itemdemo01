<template>
	<div class="bottom-bar">
		 <div class="check-content">
			 <check-button class="check-button" 
			 :is-checked="isSelectAll"
			 @click.native="checkClick"
			 ></check-button>
			 <span>全选</span>
		 </div>
		 <div class="price">
			 合计:{{totalPrice}}
		 </div>
		 
		 <div class="calculate">
			 去计算: ({{checkLength}})
		 </div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton';
	export default{
		name:"CartBottomBar",
		
		components:{
			CheckButton
		},
		computed:{
			totalPrice(){
				return '￥' + this.$store.state.cartList.filter(item=>{
					return item.checked
				}).reduce((preValue,item)=>{
					return preValue + item.price * item.count
				},0)
			},
			checkLength(){
				return this.$store.state.cartList.filter(item=> item.checked).length
			},
			isSelectAll(){
				if(this.$store.state.cartList.length==0){
					return false
				}
				return !(this.$store.state.cartList.filter(item => !item.checked).length)
				
			}
		},
		methods:{
			checkClick(){
				// console.log('----')
				if(this.isSelectAll){
					this.$store.state.cartList.forEach((item)=>{item.checked=false})
				}
				else{
					this.$store.state.cartList.forEach((item)=>{item.checked=true})
				}
			}
		}
	}
</script>

<style scoped="">
	.bottom-bar{
		height: 40px;
		line-height: 40px;
		background-color: #eee;
		position: fixed;
		bottom: 49px;
		left: 0;
		right: 0;
		display: flex;
		line-height: 40px;
		font-size: 16px;
		
	}
	.check-button{
		width: 22px;
		height: 22px;
		line-height: 22px;
		margin-right: 5px;
	}
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 10px;
		margin-right: 5px;
		width: 60px;
	}
	.price{
		margin-left: 20px;
		flex: 1;
	}
	.calculate{
		width: 90px;
		background-color: red;
		color: #fff;
	}
</style>
