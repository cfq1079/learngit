<template>
	<view>
		<van-row>
			<van-col span="8">
		  	<view @click="onGuideTap" data-latitude='35.41408' data-longitude='114.066224' data-bankName='新乡医学院'  style="margin-top:30rpx">
				<image style="width:36%;height:110rpx;" class="mix" src="/image hang.png"></image>
				<view><text>地图导航</text></view>
		    </view>
			</van-col>
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		 onLoad: function(options) {
		    this.setData({
				aww:app.globalData.userInfo,
				})
				console.log(options)
		    var that = this
		    //获取当前的地理位置、速度
		    wx.getLocation({
		      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
		      success: function (res) {
		        //赋值经纬度
		        that.setData({
		          latitude: res.latitude,
		          longitude: res.longitude,
		        })
		      }
		    })
		  },
		methods: {
			bindcontroltap(e) {
			    var that = this;
			    if (e.controlId == 1) {
			      that.setData({
			        latitude: this.data.latitude,
			        longitude: this.data.longitude,
			        scale: 14,
			      })
			    }
			  },
			  onGuideTap: function (event) {
			      var lat = Number(event.currentTarget.dataset.latitude);
			      var lon = Number(event.currentTarget.dataset.longitude);
			      var bankName = event.currentTarget.dataset.bankname;
			      console.log(lat);
			      console.log(lon);
			      wx.openLocation({
			        type: 'gcj02',
			        latitude: lat,
			        longitude: lon,
			        name: bankName,
			        scale: 28
			      })
			    },
		}
	}
</script>

<style>

</style>
