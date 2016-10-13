
var App = function(){
	this.init();
};
App.prototype = {
	window: {
		height: 1280,
		width: 720,
	},
	initWindow: function(){
		this.windowRate = 0.5625; // 720 / 1280
		this.window.height = $(window).height();
		this.window.width = $(window).width();
		var scale = 1;
		var width = this.window.width;
		var height = this.window.height;
		if(width / height > this.windowRate){
			width = height * this.windowRate;
			scale = height / 1280;
		} else {
			height = width / this.windowRate;
			scale = width / 720;
		}


		$(".stage").css({
			//transform: 'scale('+scale+')',
		});
	},
	init: function(){
		this.initWindow();
		
		this.initData();
		this.vm = new Vue({
			el: ".stage",
			data: this.vmData,
			methods: {},
		});

	},

	initData: function(){
		this.vmData = {};
		this.vmData.dataTableFruitList = [
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
		this.vmData.dataTableStageList = [
			{
				img: "./image/fruit/watermelon-l.png",
				num: 40,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: "./image/fruit/grap-l.png",
				num: 30,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: "./image/fruit/banana-l.png",
				num: 20,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: "./image/fruit/apple-l.png",
				num: 10,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: "./image/fruit/watermelon-x.png",
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: "./image/fruit/grap-x.png",
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: "./image/fruit/banana-x.png",
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			{
				img: "./image/fruit/apple-x.png",
				num: 5,
				status: 0,
				count: 0,
				total: 0,
			},

		];
	}

}
new App();



