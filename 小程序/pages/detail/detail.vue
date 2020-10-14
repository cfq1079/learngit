<template>
	<view>
		<image :src="deatil.pro.photo_x" style="width:100%"></image>
		<text class="van-multi-ellipsis--l2">{{deatil.pro.name}}</text>
		<view class="mit">
			<text>￥{{deatil.pro.price}}</text>
			<text>库存:996</text>
		</view>
		<van-tabs bind:click="onClick" style='height:200px'>
			<van-tab title="图文详情">
				<rich-text :nodes="deatil.pro.content" bindtap="tap"></rich-text>
			</van-tab>
			<van-tab title="产品参数">
				<view>
					<text>商品名称：</text>
					<text>{{deatil.pro.name}}</text>
				</view>
				<view>
					<text>商品编号：</text>
					<text>{{deatil.pro.id}}</text>
				</view>
				<view>
					<text>分类： </text>
					<text>积分</text>
				</view>
			</van-tab>
		</van-tabs>
		<view class="shop">
			<text @click="showPopup">立即购买</text>
		</view>
		<van-action-sheet :show=" show " style="padding:15px 15px;">
			<view class="shops">
				<view style="display:flex;width:100%;">
					<image :src="deatil.pro.photo_x" style="width:100%"></image>
					<view class="shoing">
						<text class="van-multi-ellipsis--l3">{{deatil.pro.name}}</text>
						<text style="color: red;">￥{{deatil.pro.price}}</text>
						<text>库存</text>
					</view>
				</view>
				<text @click="onClose">×</text>
			</view>
			<view class="cly">
				<text>购买数量</text>
				<van-stepper :value="1" @change="onChange" />
			</view>
			<view class="shoping">
				<text @click="ding(deatil.pro.id)">立即购买</text>
			</view>
		</van-action-sheet>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				deatil: [],
				show: false,
			}
		},
		onLoad(e) {
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
					this.deatil = res.data
				}
			})
		},
		methods: {
			showPopup() {
				this.show = true;
			},
			onClose() {
				this.show = false;
			},
			onChange(event) {
				uni.setStorageSync('shu', event.detail);
				console.log(event.detail)
			},
			ding(id) {
				let din = id
				uni.navigateTo({
					url:"/pages/ding/ding?id="+din 
				})
			}
		}
	}
</script>

<style>
	.shop {
		width: 100%;
		background-color: red;
		color: white;
		padding-bottom: 15px;
		padding-top: 15px;
		text-align: center;
		margin: 0;
		position: fixed;
		top: 90vh;
	}

	.shops {
		display: flex;
		justify-content: space-between;
		width: 94%;
		margin: 3%
	}

	.shoing {
		display: flex;
		flex-direction: column;
		width: 50%
	}

	.shoping {
		width: 100%;
		background-color: red;
		color: white;
		padding-bottom: 15px;
		padding-top: 15px;
		text-align: center
	}

	.cly {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10%
	}
</style>
