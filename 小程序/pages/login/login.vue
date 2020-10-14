<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<view>
				<view class='header'>
					<image src='/static/imge/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button class='bottom' type='primary' open-type="getUserInfo" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			wxGetUserInfo(){
				var url = this.Global.url
				uni.login({
					success: res => {
						var code = res.code;
						console.log(code);
						uni.getUserInfo({
							success: res => {
								console.log(res);
								uni.request({
									url: url + 'Api/Login/getsessionkey',
									method: 'POST',
									data: {
										code: code
									},
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									success: ress => {
										console.log(ress.data);
										// 通过微信自带code，向后台获取openID、session_key
										uni.setStorageSync('openid', ress.data.openid);
										uni.setStorageSync('session_key', ress.data.session_key);
										uni.request({
											url: url + 'Api/Login/authlogin',
											method: 'POST',
											data: {
												openid: uni.getStorageSync('openid'),
												NickName: res.userInfo.nickName,
												HeadUrl: res.userInfo.avatarUrl,
												gender: res.userInfo.gender
											},
											header: {
												'content-type': 'application/x-www-form-urlencoded'
											},
											success: res => {
												// 获取用户ID
												var id = res.data.arr.id;
												uni.setStorageSync('id', id);
												uni.switchTab({
												    url: '/pages/index/index'
												})
											}
										})
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>

