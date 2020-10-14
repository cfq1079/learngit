<template>
	<view>
		<button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			 		// 解密手机号（通过想后台获取的session_key解密手机号）
			getPhoneNumber: function(e) {
					console.log(e);
					console.log(e.detail.errMsg == 'getPhoneNumber:ok');
					if (e.detail.errMsg == 'getPhoneNumber:ok') {
						uni.request({
							url: 'https://exam.qhynice.top/index.php/Api/User/deciphering',
							method: 'GET',
							data: {
								sessionID: uni.getStorageSync('session_key'),
								encryptedDataStr: e.detail.encryptedData,
								iv: e.detail.iv
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: res => {
								console.log(res.data.phoneNumber);
							}
						});
					} else {
						uni.showToast({
							title: '获取手机号失败',
							duration: 2000,
							icon: 'none'
						});
					}
			}
		}
	}
</script>

<style>
 .btn {
 	border: 1px solid gray;
 }
</style>
