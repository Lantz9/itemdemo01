<template>
	<div class="toast">
		<div v-show="show">{{message}}</div>
	</div>
</template>

<script>
	export default{
		name:"Toast",
		props:{
			message:{
				type:String,
				default:''
			},
			show:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style scoped="">
	.toast{
		font-size: 14px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		color: #fff;
		padding: 8px 10px;
		background-color: rgba(0,0,0,.8);
		
	}
</style>
