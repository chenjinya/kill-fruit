var App = function(){
	this.init();
};
App.prototype = {
	window: {
		height: 1230,
		width: 720,
	},
	stageWidth: 720,
	stageHeight: 1230,
	scale : 1,

	//轮盘水果数据
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
	//水果数据
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
	//刀具数据
	knifeData: {
		1: {
			id:1,
			money: 500,
			img: './image/knife-1.png',
			active: false,
		},
		2: {
			id:2,
			money: 1000,
			img: './image/knife-2.png',
			active: false,
		},
		3: {
			id:3,
			money: 5000,
			img: './image/knife-3.png',
			active: false,
		},
		4: {
			id:4,
			money: 10000,
			img: './image/knife-4.png',
			active: false,
		},
		5: {
			id:5,
			money: 50000,
			img: './image/knife-5.png',
			active: false,
		},
	},
	//刀具切水果展示位置
	knifeClickPos:{},
	//刀具切水果展示
	knifeClickShow: false,
	//刀具切水果展示timeout
	knifeClickTimeout: null,

	//弹窗timeout
	alertInfoTimeout: null,

	//倒计时timer
	timer: null,



	//轮盘旋转时间
	loopTime: 1000,
	loopFruitTimeout: null,
	loopCircle: 2,

	step1Time: 2,
	step2Time: 2,
	step3Time: 13,
	audioMap: {},


	initWindow: function(){
		this.windowRate = this.stageWidth / this.stageHeight; // 720 / 1280
		this.window.height = $(window).height();
		this.window.width = $(window).width();
		var scale = this.scale = 1;
		var width = this.window.width;
		var height = this.window.height;
		if(width / height > this.windowRate){
			width = height * this.windowRate;
			scale = height / this.stageHeight;
		} else {
			height = width / this.windowRate;
			scale = width / this.stageWidth;
		}
		this.scale = scale;
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
	initVuePlugin: function(){
		var self = this;
		//add a tap. to fast touched action
		Vue.directive('tap', {
			acceptStatement:true,
			bind: function () {
				var plugin = this;
				this.el.addEventListener("touchstart", function(e){
					if(typeof plugin.handler == "function"){
						self.knifeClickPos.x = e.changedTouches[0].clientX;
						self.knifeClickPos.y = e.changedTouches[0].clientY;
						plugin.handler.call(this)
					}
				});
			},
			update: function (fn) {
				this.handler = fn;
			},
			unbind: function () {
			
			}
		});

		Vue.directive('audio', {
			//acceptStatement:true,
			bind: function () {
				
			},
			update: function (fn) {
				//console.log(fn,this.el,this);
				//this.el.play();
				// fn.call(this.el);
				self.audioMap[this.expression] = this.el;
			},
			unbind: function () {
			
			}
		});
	},
	init: function(){
		var self = this;
		this.initWindow();
		this.initData();
		this.initVuePlugin();
		this.vm = new Vue({
			el: ".app",
			data: this.vmData,
			methods: {
				handleKnifeBtn: function(item){
					if(self.vmData.dataGameStatus.step !=2){
						console.log("游戏未开始")
						return false;
					}
					if(item.money <= self.vmData.dataUserInfo.money){
						self.vmData.currentKnife = item;
						self.vmData.knifeClickShow = false;
					} else {
						self.alert({
							title: '提示',
							content: '<p>余额不足</p>',
						});
						self.vmData.currentKnife = 0;
					}
					return false;
				},
				handleCutFruit: function(item){
					if(self.vmData.dataGameStatus.step !=2){
						console.log("游戏未开始")
						return false;
					}
					if(!self.vmData.currentKnife){
						self.alert({
							title: '提示',
							content: '<p>请先选择刀具后切水果</p>',
						});
						return false;
					}
					var money = self.vmData.currentKnife.money ;
					if(self.vmData.dataUserInfo.money - money < 0){
						self.alert({
							title: '提示',
							content: '<p style="margin:40px auto;">余额不足</p>',
						});
						self.vmData.currentKnife = 0;

						return false;
					}

					self.vmData.dataUserInfo.isSound && self.playAudio("cut");;
					self.vmData.currentFruit = item;
					item.count += money ;//个人的
					item.total += 1 ;//全部的次数

					self.vmData.dataUserInfo.money -= money;

					self.vmData.knifeClickShow = false;

					if(!self.vmData.currentCut[item.id]){
						self.vmData.currentCut[item.id] = {
							id: item.id,
							times: 0,
							money: money,
						}
					}
					self.vmData.currentCut[item.id].times += 1;

					self.vmData.knifeClickStyle = {
						top: self.knifeClickPos.y / self.scale + "px",
						left: self.knifeClickPos.x / self.scale + "px",
					};
					setTimeout(function(){
						self.vmData.knifeClickShow = true;
					}, 10);

					self.knifeClickTimeout && clearTimeout(self.knifeClickTimeout);
					self.knifeClickTimeout = setTimeout(function(){
						self.vmData.knifeClickShow = false;
					}, 2000);

					// self.vmData.dataUserInfo.diffMoney -= money;
				},
				handlerRepeatBtn: function(){
					var lastCut = self.vmData.lastCut;
					var totalMoney = 0;
					for(var i in lastCut){
						totalMoney += lastCut[i].money * lastCut[i].times;
					}
					if(self.vmData.dataUserInfo.money < totalMoney){
						self.alert({
							title: '提示',
							content: '<p>余额不足</p>',
						});
						self.vmData.currentKnife = 0;
						return false;
					}
					for( var i in lastCut){
						var cut = lastCut[i];
						self.vm.handleCutFruit(self.vmData.dataTableStageList[cut.id]);
					}
				},
				handlerCloseAlert: function(){
					self.vmData.alertInfo.out = true;
				},
				handlerSwitchSound: function(){
					if(true == self.vmData.dataUserInfo.isSound){
						self.vmData.dataUserInfo.isSound = false;
						self.audioMap["background"].pause();
					} else {
						self.vmData.dataUserInfo.isSound = true;
						self.audioMap["background"].play();
					}
					

				},
			},
		});

		this.vm.handlerSwitchSound();
		
		this.process();
	},
	process: function(){
		//get no status
		var step = 1;
		var time = 0;
		switch(step){
			case 1:
				this.processStepReady(time);
				break;
			case 2:
				this.processStepCuting(time);
				break;
			case 3:
				this.processStepPosting(time);
				break;
			default:
				this.alert({
					content: "数据错误"
				});
				break;
		}
	},
	processStepReady : function(initTime){
		var self = this;
		this.vmData.alertInfo.out = true;
		this.vmData.dataGameStatus.step = 1;
		this.vmData.dataGameStatus.loopCircle = this.loopCircle;
		this.timeCouting(initTime ? initTime : this.step1Time, function(){
			self.processStepCuting(self.step2Time);
		});
		this.vmData.dataLoopFruit.no = -1;
		for( var i in this.vmData.dataTableStageList){
			this.vmData.dataTableStageList[i].count = 0;
			this.vmData.dataTableStageList[i].total = 0;
		}
	},
	processStepCuting : function(initTime){
		

		console.log(this.vmData.currentCut);
		var self = this;
		this.vmData.dataGameStatus.step = 2;
		this.timeCouting(initTime ? initTime : this.step2Time, function(){
			self.processStepPosting();
		});
		
	},
	processStepPosting : function(initTime){
		var self = this;
		this.vmData.dataGameStatus.step = 3;
		var oldNo = this.vmData.dataLoopFruit.end;
		var endNo = Math.floor((Math.random()* 22));
		this.vmData.dataLoopFruit = {
			no: oldNo,
			id: 0,
			end: endNo,
			step: endNo + 22 * this.loopCircle - oldNo
		};
		console.log("start", oldNo, "end", endNo)
		this.loopFruitList(true);

		//倒计时
		this.timeCouting(initTime ? initTime : this.step3Time, function(){
			self.processStepReady(self.step1Time);
		});
	},
	postResult: function(){
		var self = this;
		var costMoney = 0;
		var earnMoney = 0;
		for(var i in this.vmData.currentCut){

			var cutItem = this.vmData.currentCut[i];
			var fruitId = cutItem.id;
			console.log(self.vmData.dataLoopFruit.id)
			console.log(cutItem.id);
			costMoney += cutItem.times * cutItem.money;
			if(fruitId == this.vmData.dataLoopFruit.id){
				console.log("中奖了");
				earnMoney = this.vmData.dataTableStageList[fruitId].times * cutItem.times * cutItem.money;
				this.vmData.dataUserInfo.money += earnMoney;
				this.vmData.dataUserInfo.diffMoney += earnMoney;
			} 
			
		}

		
		this.vmData.dataTableHistoryList.push(this.fruitData[self.vmData.dataLoopFruit.id]);
		if(this.vmData.dataTableHistoryList.length > 10){
			this.vmData.dataTableHistoryList.shift();
		}
		//this.vmData.dataUserInfo.money -= costMoney;
		this.vmData.dataUserInfo.diffMoney -= costMoney;

		this.vmData.lastCut = Object.assign({}, this.vmData.currentCut);
		this.vmData.currentCut = {};


		var alertTitle = "恭喜您中奖";
		// var earnMoney = 0;
		// var costMoney = 2000;
		var moneyRes = earnMoney - costMoney;

		if(earnMoney == 0){
			self.vmData.dataUserInfo.isSound && self.playAudio("lose" + Math.ceil(Math.random(0,1)));
			alertTitle = '<h3 class="alert-fail-title">很遗憾,本轮未中奖</h3><p  class="alert-fail-subtitle">历练值'+ (moneyRes) +'</p>';
		} else {
			self.vmData.dataUserInfo.isSound && self.playAudio("win" + Math.ceil(Math.random(0,1)));
			alertTitle = '<h3 class="alert-success-title">恭喜您中奖</h3><p  class="alert-success-subtitle">历练值 '+ (moneyRes >= 0? '+' + moneyRes : moneyRes) + '</p>';
		}
		var prizeList = '';
		for(var i in [0,1,2,3,4,5,6,7,1,2,3,4,5,6,7,8]){
			prizeList += ''
			+ 	'<li class="prize-list-item" >'
			+ 		'<div class="prize-list-name" >瓦的福克斯的风景</div>'
			+		'<div class="prize-list-prize" >92492340</div>'
			+	'</li>';
		}
		this.alert({
			title: "中奖提示",
			content: '<div>' + alertTitle + '</div><div class="alert-prize-list">'
			+ '<div class="prize-list-title" >'
			+ 	'<div class="prize-list-name" >中奖人</div>'
			+	'<div class="prize-list-prize" >历练值</div>'
			+ '</div>'
			+ '<ul>'
			+ prizeList
			+ '</ul>'
			+ '</div>'
		}, true);

		
	},
	loopFruitList: function(init){
		var self = this;
		self.vmData.dataUserInfo.isSound && self.playAudio("turn");
		console.log("loop total step", self.vmData.dataLoopFruit.step);
		// 44
		// 耗时 7s
		var needTime = 6 * 1000;
		var maxLoop = 22 * (this.loopCircle + 1);
		// self.loopTime =  needTime / (maxLoop / 2) - this.vmData.dataLoopFruit.step * (needTime / ((maxLoop / 2)* maxLoop) );
		// if(self.loopTime == 0){
		// 	self.loopTime = 1;
		// }
		if(self.vmData.dataLoopFruit.step < 3){
			self.loopTime = 500;
		} else if(self.vmData.dataLoopFruit.step < 6){
			self.loopTime = 400;
		} else if(self.vmData.dataLoopFruit.step < 10){
			self.loopTime = 300;
		} else {
			self.loopTime = 100;
		} 
		console.log(self.loopTime);
		// if(this.vmData.dataGameStatus.loopCircle > 0){
		// 	this.loopTime = 50;
		// }

		this.loopFruitTimeout && clearTimeout(this.loopFruitTimeout);
		this.loopFruitTimeout = setTimeout(function(){
			if(init){
				var fruitIndex = self.vmData.dataLoopFruit.no;
				var currentLoopFruit = self.vmData.dataTableFruitList[fruitIndex];
				currentLoopFruit.no = fruitIndex;
				self.vmData.dataLoopFruit.id = currentLoopFruit.id;
				//console.log(self.vmData.dataLoopFruit)
			}

			++ self.vmData.dataLoopFruit.no;
			-- self.vmData.dataLoopFruit.step;

			if(self.vmData.dataLoopFruit.no > self.vmData.dataTableFruitList.length - 1){
				self.vmData.dataLoopFruit.no = 0;
				
			}

			//self.audioMap["turn"].pause();
			
			if(self.vmData.dataLoopFruit.step == 0){
				console.log('no',self.vmData.dataLoopFruit.no, 'end',self.vmData.dataLoopFruit.end);
				self.vmData.dataLoopFruit.id = self.vmData.dataTableFruitList[self.vmData.dataLoopFruit.no].id;
				console.log("公布奖励", self.vmData.dataLoopFruit.id);
				self.postResult();
				return true;
			}  

			self.loopFruitList();

		}, this.loopTime);
	},
	playAudio: function(type){
		var src = this.audioMap[type].src;
		var au = new Audio();
		var $au = $(au);
		au.autoplay = true;
		au.src = src;
		au.controls = false;
		au.onended = function(){
			$au.remove();
		}
		$(".audio-section").append($au);
		//this.vm.el.
	},
	timeCouting: function(initNum,fn, processfn){
		var self = this;
		this.vmData.dataGameStatus.timeout = initNum;
		this.vmData.dataGameStatus.datetime =(Date.now()/ 1000 + initNum); 
		this.timer = clearTimeout(this.timer);
		this.timer = setTimeout(function(){
			self.vmData.dataGameStatus.timeout = Math.ceil(self.vmData.dataGameStatus.datetime - Date.now()/1000);
			console.log("game time",self.vmData.dataGameStatus.timeout);
			processfn && processfn();
			if(self.vmData.dataGameStatus.timeout <= 0){
				clearInterval(self.timer);
				fn && fn();
			} else {
				self.timeCouting(self.vmData.dataGameStatus.timeout, fn, processfn);
			}
		}, 1000);
		
	},
	setInterval: function(time){
		var _t = Date.now();
		return _t - time;
	},
	bindUIEvent: function(){

	},
	initData: function(){

		var fruitData = this.fruitData;
		this.vmData = {};
		this.vmData.dataTableFruitList = [];
		for(var i in this.fruitList){
			var index = this.fruitList[i];
			this.vmData.dataTableFruitList.push(Object.assign({}, fruitData[index]));
		}

		this.vmData.dataTableFruitList[2].active = true;

		this.vmData.dataTableStageList = {
			8: {
				id: 8,
				img: fruitData[8].img,
				times: 40,
				status: 0,
				count: 0,
				total: 0,
			},
			4: {
				id: 4,
				img: fruitData[4].img,
				times: 30,
				status: 0,
				count: 0,
				total: 0,
			},
			6: {
				id: 6,
				img: fruitData[6].img,
				times: 20,
				status: 0,
				count: 0,
				total: 0,
			},
			2: {
				id: 2,
				img: fruitData[2].img,
				times: 10,
				status: 0,
				count: 0,
				total: 0,
			},
			7: {
				id: 7,
				img: fruitData[7].img,
				times: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			3: {
				id: 3,
				img: fruitData[3].img,
				times: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			5: {
				id: 5,
				img: fruitData[5].img,
				times: 5,
				status: 0,
				count: 0,
				total: 0,
			},
			1: {
				id: 1,
				img: fruitData[1].img,
				times: 5,
				status: 0,
				count: 0,
				total: 0,
			},

		};

		this.vmData.dataTableKnifeList = [];
		for( var i in this.knifeData){
			this.vmData.dataTableKnifeList.push(this.knifeData[i]);
		}

		this.vmData.dataTableHistoryList = [];
		// for( var i in [1,4,3,5,7,5,3,4,2,8,7,6 ]){
		// 	var index = [1,4,3,5,7,5,3,4,2,8,7,6 ][i];
		// 	this.vmData.dataTableHistoryList.push(this.fruitData[index]);
		// }
		
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
		];


		this.vmData.dataGameStatus = {
			timeout: 10,
			step: 2, // 1 准备， 2， 切水果，3，公布
			loopCircle: 3,
		}
		this.vmData.dataUserInfo = {
			isSound: false,
			isBanker: true,
			money: 5000,
			diffMoney: 0,
			
		}
		this.vmData.currentKnife = 0;
		this.vmData.currentFruit = {};
		this.vmData.currentCut = {};
		this.vmData.knifeClickShow = false;
		this.vmData.knifeClickStyle = {
			display: 'none',
			top: 0,
			left: 0,
		}
		this.vmData.alertInfo = {
			title: '',
			content: '',
			out: true,
		};
		this.vmData.dataLoopFruit = {
			id: 0,
			no: -1,
			end: 0,
			step: 22 * 3,
		}
	}, 
	alert: function(alertInfo, noautoclose){
		var self = this;
		alertInfo.out = false;
		if(!alertInfo.title){
			alertInfo.title = "提示";
		}
		this.vmData.alertInfo = alertInfo;
		if(!noautoclose) {
			self.alertInfoTimeout && clearTimeout(self.alertInfoTimeout);
			self.alertInfoTimeout = setTimeout(function(){
				console.log('hide')
				self.vmData.alertInfo.out = true;
				console.log(self.vmData.alertInfo)
			}, 2000);
		}
		
	}

}
var app = new App();
