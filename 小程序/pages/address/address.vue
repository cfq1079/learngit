<template>
	<view>
		<view>
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">姓名</view>
					<input class="uni-input" name="name" placeholder="收货人姓名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">电话</view>
					<input class="uni-input" name="phone" placeholder="收货人电话" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">地址选择</view>
					<picker name="address" mode="region" @change="RegionChange" :value="region" :custom-item="customItem">
						<view class="picker">{{ region[0] }}，{{ region[1] }}，{{ region[2] }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column default">
					<view class="title">设置为默认地址</view>
					<view><switch name="switch" /></view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">详情地址</view>
					<input class="uni-input" name="details" placeholder="请输入详情地址" />
				</view>
				<view class="uni-btn-v"><button form-type="submit">添加地址</button></view>
			</form>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			region: ['广东省', '广州市', '海珠区']
		};
	},
	methods: {
		RegionChange: function(e) {
			this.region = e.detail.value;
		},
		formSubmit: function(e) {
			if (e.detail.value.switch == true) {
				var i = 1;
			} else {
				var i = 0;
			}
			uni.request({
				url: 'https://star.qhynice.top/api/address/index',
				method: 'POST',
				data: {
					user_id: 73,
					name: e.detail.value.name,
					phone: e.detail.value.phone,
					address: e.detail.value.address[0] + e.detail.value.address[1] + e.detail.value.address[2],
					is_default: i
				},
				success: res => {
					console.log(res);
					uni.redirectTo({
						url: '/pages/add/add'
					})
				}
			})
		}
	}
};
</script>

<style>
.uni-form-item {
	display: flex;
	align-content: flex-start;
	border-bottom: 1px solid #ededed;
	padding: 15px;
}
.title {
	width: 25vw;
}
.default {
	display: flex;
	justify-content: space-between;
}
</style>
