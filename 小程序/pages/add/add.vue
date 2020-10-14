<template>
	<view class="content">
		  <view  v-for="(item, index) in info" :key="index">
			  <view class=" box">
		      <view>姓名：{{item.name}}</view>
		      <view>电话：{{item.phone}}</view>
			  <view class="add">
		      <text>地址：{{item.address}}</text>
		      <text class="del" @click="reset(item.id)">删除</text>
			  </view>
		  </view>
		</view>
		<!-- 添加地址 -->
		<view class="but">
		  <button @click="add()">添加地址</button>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
		info:[]
	}
	},
	onLoad:function() {
		var _this = this
		uni.request({
			url:'https://star.qhynice.top/api/address/getaddress',
			method:'GET',
			data:{
				user_id: 73
			},
			success(res) {
				console.log(res)
				_this.info = res.data.res
			}
		})
	},
	methods:{
		reset:function(id){
			var that = this
			that.id = id
			console.log(id)
			uni.request({
				url:'https://star.qhynice.top/api/address/del_adds',
				method:'POST',
				data:{
					user_id: 73,
					id: id
				},
				success: (res) => {
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					page.onLoad()
				}
			})
		},
		add:function(){
			uni.navigateTo({
				url:'/pages/address/address'
			})
		}
	}
}
</script>

<style scoped>
.box{
  overflow: auto;
  font-family: 宋体;
  font-size: 13px;
  width: 90%;
  margin-left: 2.5%;
  margin-top: 2.5%;
  padding: 2.5%;
  border-style: solid;
  border-color: #969799;
  border-width: 1px;
}
.add{
	display: flex;
	justify-content: space-between;
}
.del{
	border-style: solid;
	border-color: #07C160;
	border-width: 1px;
	color: #07C160;
	padding: 3px;
}
.but{
	position: fixed;
	top: 90vh;
}
.but{
	width: 100%;
	text-align: center;
}
</style>
