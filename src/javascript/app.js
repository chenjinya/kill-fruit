var App = function(){
	this.init();
};
App.prototype = {
	window: {
		height: 1280,
		width: 720,
	},
	stageWidth: 720,
	stageHeight: 1280,
	fruitList: [
		4,
		7,
		3,
		5,
		1,
		6,
		7,
		3,
		2,
		5,
		1,
		8,
		7,
		3,
		5,
		1,
		6,
		7,
		3,
		2,
		5,
		1,
		
	],
	fruitData: {
		1: {
			id: 1,
			img: "./image/fruit/apple-x.png",
		},
		2: {
			id: 2,
			img: "./image/fruit/apple-l.png",
		},
		3: {
			id: 3,
			img: "./image/fruit/grap-x.png",
		},
		4: {
			id: 4,
			img: "./image/fruit/grap-l.png",
		},
		5: {
			id: 5,
			img: "./image/fruit/banana-x.png",
		},
		6: {
			id: 6,
			img: "./image/fruit/banana-l.png",
		},
		7: {
			id: 7,
			img: "./image/fruit/watermelon-x.png",
		},
		8: {
			id: 8,
			img: "./image/fruit/watermelon-l.png",
		}
	},
	initWindow: function(){
		this.windowRate = this.stageWidth / this.stageHeight; // 720 / 1280
		this.window.height = $(window).height();
		this.window.width = $(window).width();
		var scale = 1;
		var width = this.window.width;
		var height = this.window.height;
		if(width / height > this.windowRate){
			width = height * this.windowRate;
			scale = height / this.stageHeight;
		} else {
			height = width / this.windowRate;
			scale = width / this.stageWidth;
		}

		$(".stage").css({
			width: this.stageWidth + "px",
			height: this.stageHeight + "px",

			transform: 'scale('+scale+')',
			left: (this.window.width - width) /2 + "px",
			top: (this.window.height - height) /2 + "px",
		});
		$("body").css({
			width: width + "px",
			height: height + "px",
		});
	},
	init: function(){
		var self = this;
		this.initWindow();
		
		this.initData();
		this.vm = new Vue({
			el: ".stage",
			data: this.vmData,
			methods: {
				handleKnifeBtn: function(index){
					console.log(index)
					if(self.vmData.dataTableKnifeList[index].money < self.vmData.dataUserInfo.money){
						for(var i in self.vmData.dataTableKnifeList){
							self.vmData.dataTableKnifeList[i].active = false;
						}
						self.vmData.dataTableKnifeList[index].active = true;
					} else {
						alert("没钱")
					}
					return false;
				}
			},
		});
	},

	initData: function(){

		var fruitData = this.fruitData;
		this.vmData = {};
		this.vmData.dataTableFruitList = [];
		for(var i in this.fruitList){
			var index = this.fruitList[i];
			this.vmData.dataTableFruitList.push(_.clone(fruitData[index]));
		}

		this.vmData.dataTableFruitList[2].active = true;

		this.vmData.dataTableStageList = [
			{
				img: fruitData[8].img,
				num: 40,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: fruitData[4].img,
				num: 30,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: fruitData[6].img,
				num: 20,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: fruitData[2].img,
				num: 10,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: fruitData[7].img,
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: fruitData[3].img,
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: fruitData[5].img,
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: fruitData[1].img,
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},

		];

		this.vmData.dataTableKnifeList = [
			{
				id:1,
				money: 500,
				img: './image/knife-1.png',
				active: false,
			},
			{
				id:2,
				money: 1000,
				img: './image/knife-2.png',
				active: false,
			},
			{
				id:3,
				money: 5000,
				img: './image/knife-3.png',
				active: false,
			},
			{
				id:4,
				money: 10000,
				img: './image/knife-4.png',
				active: false,
			},
			{
				id:5,
				money: 50000,
				img: './image/knife-5.png',
				active: false,
			},
		];

		this.vmData.dataTableHistoryList = [
			{
				id: 1,
				img: "./image/fruit/grap-l.png",
			},
			{
				id: 2,
				img: "./image/fruit/watermelon-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/grap-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/banana-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/apple-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/banana-l.png",
			},
			{
				id: 1,
				img: "./image/fruit/watermelon-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/grap-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/apple-l.png",
			},
			{
				id: 1,
				img: "./image/fruit/banana-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/apple-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/watermelon-l.png",
			},
			{
				id: 1,
				img: "./image/fruit/watermelon-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/grap-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/banana-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/apple-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/banana-l.png",
			},
			{
				id: 1,
				img: "./image/fruit/watermelon-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/grap-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/apple-l.png",
			},
			{
				id: 1,
				img: "./image/fruit/banana-x.png",
			},
			{
				id: 1,
				img: "./image/fruit/apple-x.png",
			},
		];
		this.vmData.dataBankerList = [
			{
				name: "花生与米国",
				money: 34953496,
			},
			{
				name: "混沌大魔王",
				money: 4393923,
			},
			{
				name: "奇葩大胜",
				money: 43021212,
			},
			{
				name: "混沌使者",
				money: 1231393,
			}
		]
		this.vmData.dataGameStatus = {
			timeout: 10,
			step: 1, // 1 准备， 2， 切水果，3，公布
		}
		this.vmData.dataUserInfo = {
			isSound: false,
			isBanker: true,
			money: 500000000,
			diffMoney: 100,
		}
	}

}
var app = new App();
