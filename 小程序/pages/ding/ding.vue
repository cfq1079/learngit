<template>
	<view>
		<view class="cly">
			<image :src="shop.photo_x"></image>
			<view class="css">
				<text class="van-multi-ellipsis--l2">{{shop.intro}}</text>
				<text>￥{{shop.price}}</text>
				<text>数量{{num}}</text>
			</view>
		</view>
		<view>
			<view>
				<!-- 收货地址 -->
				<view class="add" @click="add()">
					<view>
						<view>收货人：{{ people.name }}</view>
						<view>{{ people.phone }}</view>
					</view>
					<view>地址：{{ people.address }}</view>
				</view>
			</view>
		</view>
		<view class="ccy"><text>应共支付:￥{{zong}}</text></view>
		<button class="but">线下支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop: [],
				num: '',
				zong: "",
				people: []
			}
		},
		onLoad(e) {
			this.num = uni.getStorageSync('shu');
			console.log(this.num)
			uni.request({
				url: 'https://exam.qhynice.top/index.php/Api/Product/index',
				data: {
					pro_id: e.id
				},
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					console.log(res);
					this.shop = res.data.pro
					this.zong = res.data.pro.price * +this.num
				}
			})
		},
		onShow() {
			// 默认地址显示
			var _this = this;
			uni.request({
				url: 'https://star.qhynice.top/api/address/getaddress',
				method: 'GET',
				data: {
					user_id: 73
				},
				success(res) {
					for (var i in res.data.res) {
						if (res.data.res[i].is_default == 1) {
							_this.people = res.data.res[i];
							var addid = res.data.res[i].id;
							_this.addid = addid;
							return false;
						}
					}
				}
			})
		},
		methods: {
			add() {
				uni.navigateTo({
					url: "/pages/add/add"
				})
			}
		}
	}
</script>

<style>
	.cly {
		display: flex;
		font-size: 13px;
		width: 100%;
		margin-top: 10%;
		margin-left: 5%
	}

	.css {
		display: flex;
		flex-direction: column
	}

	.cly image {
		width: 70%;
		height: 30vh;
	}

	.ccy {
		text-align: center;
		margin-top: 20%;
		margin-bottom: 7%
	}

	.but {
		width: 60%;
		margin-left: 20%
	}

	.add {
		font-family: 仿宋;
		font-size: 13px;
	}
</style>
