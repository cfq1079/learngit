<template>
	<view>
		<view class="box">
			<view class="head">
				<image :src="userInfo.avatarUrl"></image>
				<text>{{ userInfo.nickName }}</text>
			</view>
		</view>
		<van-grid column-num="4">
			<van-grid-item icon="/static/imge/绑定手机.png" text="绑定手机" link-type="reLaunch" url='/pages/phone/phone' />
			<van-grid-item icon="/static/imge/积分.png" text="积分兑换" link-type="reLaunch" url="/pages/jifen/jifen" />
			<van-grid-item icon="/static/imge/我的订单.png" text="我的订单" link-type="reLaunch" url="/pages/yaos/yaos"/>
			<van-grid-item icon="/static/imge/授权.png" text="授权登录" link-type="reLaunch" url="/pages/login/login" />
		</van-grid>
		<button data-reply-phone="13661725473" @click="Tel">拨打电话:13661725473</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				userInfo: []
			}
		},
		onLoad() {
			uni.getUserInfo({
				provider: 'weixin',
				success: res => {
					console.log(res);
					this.userInfo = res.userInfo
				}
			})
		},
		methods: {
			Tel: function(e) {

				wx.makePhoneCall({

					phoneNumber: e.currentTarget.dataset.replyPhone,
					success: function(res) {
						console.log(e)
						console.log("成功拨打电话")
					},

				})

			}
		}
	}
</script>

<style scoped>
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50vh;
		background-color: #3F536E;
	}

	.head {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #AFAFAF;
	}

	.head image {
		width: 20vh;
		height: 20vh;
		border-radius: 5px 5px;
	}
</style>
