<template>
 	<view class="content">
 		<!-- 轮播 -->
 		<view>
 			<view class="uni-padding-wrap">
 				<view class="page-section swiper">
 					<view class="page-section-spacing">
 						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay">
 							<swiper-item v-for="(item, index) in info" :key="index"><image style="width: 100%;height: 100%;" :src="item.photo"></image></swiper-item>
 						</swiper>
 					</view>
 				</view>
 			</view>
 		</view>
 		<!-- 商品列表 -->
 		<view class="wares">
 			<view class="show">
 				<view class="single" v-for="(value, key) in shop" :key="key" @click="detail(value.id)">
 					<view class="photo">
 						<image style="width: 100%;height: 300rpx;" :src="value.photo_x"></image>
 						<view class="van-ellipsis name">{{ value.name }}</view>
 						<view class="amount">
 							<view class="money">￥{{ value.price_yh }}</view>
 							<view class="dele">{{ value.price }}</view>
 							<view class="sales">销量: {{ value.shiyong }}</view>
 						</view>
 					</view>
 				</view>
 			</view>
 		</view>
		<navigator url="../nav/nav" style="width: 70%;margin-left: 15%;height: 30px;">导航</navigator>
 	</view>
 </template>
 
 <script>
 export default {
 	data() {
 		return {
 			background: ['color1', 'color2', 'color3'],
 			indicatorDots: true,
 			autoplay: true,
 			info: [],
 			shop: []
 		};
 	},
 	onLoad() {
 		var _this = this;
 		uni.request({
 			url: 'https://exam.qhynice.top/index.php/Api/Index/index',
 			method: 'POST',
 			header: {
 				'content-type': 'application/x-www-form-urlencoded'
 			},
 			success: res => {
 				// console.log(res);
 				_this.info = res.data.ggtop;
 				_this.shop = res.data.prolist;
 			}
 		});
 	},
 	methods: {
 		changeIndicatorDots(e) {
 			this.indicatorDots = !this.indicatorDots;
 		},
 		changeAutoplay(e) {
 			this.autoplay = !this.autoplay;
 		},
 		detail: function(id) {
		var deat= id
		console.log(id);
		uni.navigateTo({
			url:"/pages/detail/detail?id="+deat
		})
 		}
 }
 }
 </script>
 
 <style>
 .swiper {
 	height: 10rem;
 }
 .wares {
 	width: 90%;
 	margin-left: 5%;
 	margin-top: 0.3125rem;
 }
 .show {
 	display: flex;
 	flex-wrap: wrap;
 	justify-content: space-between;
 }
 .single {
 	width: 48%;
 	border: 0.0625rem solid #afafaf;
 	margin-top: 0.625rem;
 	margin-bottom: 0.625rem;
 }
 .photo {
 	margin-top: 0.3125rem;
 	width: 94%;
 	margin-left: 3%;
 }
 .amount {
 	display: flex;
 	flex-wrap: wrap;
 	justify-content: space-between;
 	padding-top: 30rpx;
 	line-height: 2;
 }
 .name {
 	font-size: 0.9375rem;
 	color: gray;
 }
 .money {
 	color: #ed1c24;
 	font-size: 30rpx;
 }
 .sales {
 	font-size: 0.875rem;
 	color: gray;
 }
 .dele {
 	text-decoration: line-through;
 	font-size: 25rpx;
 }
 </style>
