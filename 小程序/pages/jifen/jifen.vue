<template>
	<view>
		<view class="back">

		</view>
		<view class="jifen">
			<view class="fen">
				<text>我的积分</text>
				<text>{{jifen}}</text>
			</view>
			<view class="fen">
				<text>待审核积分</text>
				<text>{{dai}}</text>
			</view>
		</view>
		<view class="ji">
		<view class="ipt">
			<text>
				姓名：
			</text>
			<input type="text" v-model="name"  placeholder="请输入真实姓名"/>
		</view>
		<view class="ipt">
			<text>
				收款人电话：
			</text>
			<input type="text" v-model="tel" placeholder="请输入本人电话"/>
		</view>
		<view class="ipt">
			<text>
				提现账号：
			</text>
			<input type="text" v-model="tels"  placeholder="请输入账号"/>
		</view>
		<view class="ipt">
			<text>
				提现金额：
			</text>
			<input type="text" v-model="money" @input="ipt" />
		</view>
		<view class="ipt">
			<text>
				实际到账：
			</text>
			<input type="text" v-model="moneys" />
		</view>
		</view>
		<p style="font-size: 12px;float: right;">注：提现每笔扣除10%手续费</p>
		<view class="but">
			<button @click="mon">提现申请</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jifen: [],
				dai: [],
				name: '',
				tel: '',
				tels: '',
				money: '',
				moneys: ''
			}
		},
		onShow() {
			uni.request({
				url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
				method: 'POST',
				data: {
					uid: 44
				},
				header:{
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					this.jifen = res.data.userinfo.jifen
					console.log(res.data)
				},
			
			});
			uni.request({
				url: 'https://exam.qhynice.top/index.php/Api/User/pending',
				method: 'POST',
				data: {
					uid: 44
				},
				header:{
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: ress=> {
					this.dai = ress.data.data
					console.log(ress.data)
				},
			})
		},
		methods: {
		ipt() {
		  var _this = this
		  _this.moneys = parseInt(_this.money * 0.9)
		},
		mon() {
			uni.request({
				url:"https://exam.qhynice.top/index.php/Api/User/withdraw",
				data:{
					uid:44,
					name:this.name,
					tel:this.tel,
					account:this.tels,
					num:this.money,
					jifen:this.moneys
				},
				method: "POST",
				header:{
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res=> {
					 console.log(res.data)
				}
			})
		}
		}
	}
</script>

<style>
  .back {
    width: 100%;
    padding-bottom: 30%;
    padding-top: 30%;
    background-color: #ADD8E6;
  }

  .jifen {
    width: 80%;
    margin-left: 10%;
    background-color: white;
    font-size: 100%;
    padding-bottom: 10%;
    display: flex;
    justify-content: space-around;
    margin-top: -130px;
    text-align: center;
  }
.fen{
	display: flex;
	flex-wrap: wrap;
	margin-left: 5%;
}
.ji{
	margin-top: 70px;
}
  .ipt {
    width: 90%;
    margin-left: 5%;
    display: flex;
    margin-top: 5%;
  }

  .ipt input {
    width: 65%;
    border: none;
  }

  .ipt span {
    width: 30%;
  }

  .but {
    display: flex;
    flex-direction: column;
    align-items: center;
    clear: both;
  }

  .but button {
    padding: 1% 5%;
    background-color: skyblue;
    border: none;
    border-radius: 10px 10px;
    color: #FFFFFF;
    font-family: 隶书;
  }
</style>
