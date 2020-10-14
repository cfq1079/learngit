<template>
	<view class="content">
		<view>
			<van-tabs @click="onClick">
				<van-tab title="一级" class="levels">
					<view class="level">一级用户数量:{{ length }}</view>
					<view class="one" v-for="(item, index) in info" :key="index">
						<image style="width: 3rem;height: 3rem;border-radius: 10rpx;" :src="item.photo"></image>
						<view class="title">
							<view class="username">{{ item.name }}</view>
							<view>手机号:{{ item.tel }}</view>
						</view>
					</view>
				</van-tab>
				<van-tab title="二级">
					<view class="level">二级用户数量:{{ lengths }}</view>
					<view class="one" v-for="(items, indexs) in infos" :key="indexs">
						<image style="width: 3rem;height: 3rem;border-radius: 10rpx;" :src="items.photo"></image>
						<view class="title">
							<view class="username">{{ items.name }}</view>
							<view>手机号:{{ items.tel }}</view>
						</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			info: [],
			infos: [],
			length: '',
			lengths: ''
		}
	},
	onLoad() {
		// 一级用户人员信息接口
		var _this = this
		var url = _this.Global.url
		uni.request({
			url: url + 'Api/User/tree',
			method: 'POST',
			data: {
				uid: 44
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				console.log(res);
				this.info = res.data.data;
				this.length = res.data.data.length;
			}
		});
	},
	methods: {
		// 二级用户人员信息接口
		onClick() {
			var that = this
			var url = that.Global.url
			uni.request({
				url: url + 'Api/User/tree',
				method: 'POST',
				data: {
					uid: 44,
					level: 1
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					console.log(res);
					this.infos = res.data.data;
					this.lengths = res.data.data.length;
				}
			});
		}
	}
};
</script>

<style scoped>
.levels {
	height: 80vh;
	overflow: auto;
}
.level {
	display: flex;
	justify-content: center;
}
.one {
	width: 90%;
	margin-left: 5%;
	display: flex;
	flex-wrap: nowrap;
	padding-bottom: 1rem;
}
.title{
	font-size: 30rpx;
	margin-top: 20rpx;
	line-height: 1.5;
}
.username{
	font-weight: bold;
	color: black;
}
</style>
