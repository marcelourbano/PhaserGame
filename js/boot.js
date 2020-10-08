var bootState = {
	preload: function(){
        game.load.image('progressBar','img/progressBar.png');
        game.load.image('imgBg','img/sky.png');
	},
	
	create: function(){
		game.state.start('load');
	}
};