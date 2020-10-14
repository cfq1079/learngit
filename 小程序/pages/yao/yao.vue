<template>
	<view>
		<view class="content">
			<canvas class="can" canvas-id="mycan">
			</canvas></view>
		<button @click="bye">保存海报</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				backurl: '../../static/imge/yaoqing.jpg'
			}
		},
		onShow: function(option) {
			var that = this
			// 邀请码接口请求
			uni.request({
				url: 'https://exam.qhynice.top/index.php/Api/User/getWxcode',
				data: {
					invite_code: 44
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					console.log(res.data)
					var backurl = that.backurl
					var base64url = res.data
					var imgpath = wx.env.USER_DATA_PATH + '/invite' + 'dalaba' + '.png'
					var imagedata = base64url.replace(/^data:image\/\w+;base64,/, "")
					var fs = wx.getFileSystemManager()
					fs.writeFileSync(imgpath, imagedata, "base64")
					uni.getSystemInfo({
						success(res) {
							var windowWidth = res.windowWidth
							var windowHeight = res.windowHeight
							that.windowWidth = "width:' " + windowWidth + "upx';"
							that.windowHeight = "height:' " + windowHeight + "upx';"
							const ctx = uni.createCanvasContext('mycan')
							ctx.drawImage(backurl, 0, 0, windowWidth, windowHeight)
							ctx.drawImage(imgpath, 60, 200, 200, 200)
							ctx.draw() //重绘页面
						}
					})
				}
			})
		},
		methods: {
			bye() {
				var that = this
				wx.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.showModal({
								title: '您还未授权相册权限',
								content: '点击确认授权',
								success(res) {
									if (res.confirm == true) {
										wx.authorize({
											scope: 'scope.writePhotosAlbum',
										})
									} else {
										uni.navigateTo({
											url: '../index/index'
										})
									}
								}
							})
						} else {
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: that.windowWidth * 1.22, // 截取的画布的宽
								height: that.windowHeight * 1.22, // 截取的画布的高
								destWidth: that.windowWidth * 1.22 * 3, // 保存成的画布宽度
								destHeight: that.windowHeight * 1.22 * 3, // 保存成的画布高度
								fileType: 'png', // 保存成的文件类型
								quality: 1, // 图片质量
								canvasId: 'mycan', // 画布ID
								success(res) {
									// 2-保存图片至相册
									uni.saveImageToPhotosAlbum({ // 存成图片至手机
										filePath: res.tempFilePath,
										success(res2) {
											wx.hideLoading();
											uni.showToast({
												title: '图片保存成功',
												duration: 2000
											})
										},
										fail(res3) {
											if (res3.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
												_this.$store.dispatch('SetPhoneShow', 1)
												uni.showToast({
													title: '保存失败，稍后再试',
													duration: 2000,
													icon: 'none'
												})
												wx.hideLoading();
											} else {
												uni.showToast({
													title: '保存失败，稍后再试',
													duration: 2000,
													icon: 'none'
												})
												wx.hideLoading();
											}
										}
									})
								},
								fail() {
									uni.showToast({
										title: '保存失败，稍后再试',
										duration: 2000,
										icon: 'none'
									})
									wx.hideLoading();
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.can {
		width: 100%;
		height: 100vh;
	}

	button {
		width: 100%;
	}
	.text{
		font-size: 30px;
		font-family: 微软雅黑;
		color: #AFAFAF;
		text-align: center;
		margin-top: 100px;
	}
</style>
