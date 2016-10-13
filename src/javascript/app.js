
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
			transform: 'scale('+scale+')',
		});
	},
	init: function(){
		this.initWindow();
	}
}
new App();



