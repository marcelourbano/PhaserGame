var menuState = {
    preload: function(){
        var bg = game.add.image(0,0,'imgBg');

		var txtTitle = game.add.text(game.world.centerX,225,'SUPER GUY ADVENTURE',{font:'50px Arial Black',fill:'#f50'});
            txtTitle.anchor.set(.5);
        
        var txtPressStart = game.add.text(game.world.centerX,450,'PRESSIONE ENTER PARA COMEÇAR',{font:'20px Arial black',fill:'#f00'});
            txtPressStart.anchor.set(.5);

        var txtRules = game.add.text(game.world.centerX,350,'Utilize as setas do teclado para movimentar',{font:'30px Arial',fill:'#ff0'});
            txtRules.anchor.set(.5);

        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.startGame,this);
        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.startGame,this);
	},
    
    startGame: function(){
        fase=1;
		game.state.start('fase1');
	}
};
