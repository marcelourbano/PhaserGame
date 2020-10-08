var fase = 0;
var loadState = {
	preload: function(){
        var bg = game.add.image(0,0,'imgBg');

		var txtLoading = game.add.text(game.world.centerX,225,'CARREGANDO JOGO...',{font:'30px Arial Black',fill:'#ff0'});
			txtLoading.anchor.set(.5);
	
		var progressBar = game.add.sprite(game.world.centerX,300,'progressBar');
            progressBar.anchor.set(.5);
			
		game.load.setPreloadSprite(progressBar);
        
        //carrega as imagens do jogo
        game.load.image('sky','img/sky.png');
		game.load.image('platform','img/platform.png');
		game.load.image('star','img/star.png');
		game.load.image('invWall','img/invWall.png');
		game.load.image('cloud','img/cloud.png');
        game.load.image('thumbUp','img/thumbUp.png');
        game.load.image('imgWall','img/invWall.png');
				
		//Carrega o arquivo de áudio
		game.load.audio('music','audio/music.mp3');
		game.load.audio('sndStar','audio/soundStar.mp3');
		game.load.audio('sndjump','audio/soundjump.mp3');
		game.load.audio('sndGameOver','audio/soundGameOver.mp3');
		game.load.audio('sndFim','audio/soundWin.mp3');
		game.load.audio('sndEnemy','audio/soundEnemy.mp3');
		
		//carrega sprites
		game.load.spritesheet('dude','img/spHero.png',48,72);
		game.load.spritesheet('cat','img/spEnemy.png',32,32);
    },

    create: function(){
            game.state.start('menu');
    } 
};
function cloudsmove(){
	gbclouds.cursor.body.velocity.x = 5;
	gbclouds.next();
	return;
}


function createplayer(){
	player = game.add.sprite(50,game.world.height - 150,'dude');
	game.physics.arcade.enable(player);
	player.body.gravity.y = 300;
//	player.body.bounce.y = 0.2;
	player.body.collideWorldBounds = true;
	player.animations.add('left',[0,1,2,3],10,true);
	player.animations.add('right',[5,6,7,8],10,true);
	return;
}

function createEnemys(x, y){
	var enemy = game.add.sprite(x, game.world.height - y,'cat');
	game.physics.arcade.enable(enemy);
	enemy.body.gravity.y = 300;
	enemy.body.collideWorldBounds = true;
	enemy.animations.add('left',[0,1],10,true);
	enemy.animations.add('right',[2,3],10,true);
	enemy.body.velocity.x = 0;
	return enemy;
}


function verifySide(){
	if (side == 'left'){
		catenemies.cursor.body.velocity.x += -1;
		catenemies.cursor.animations.play('left')
	}else{
		catenemies.cursor.body.velocity.x += 1;
		catenemies.cursor.animations.play('right');
	}
	
	if (catenemies.cursor.body.touching.left){
		side ='right';
		//console.log('Tocou esquerda');
	}else{
		if(catenemies.cursor.body.touching.right){
			side ='left';
			//console.log('Tocou direita');
		}
	}
}



function collectStar(player,star){
	//Toca o som
	globSndStar.play();
	player.body.touching.down=false;
	
	star.kill();

	score += 10;
	txtScore.text = 'SCORE: ' + score;
	if (score == 120){
		win = true;
		txtTimer.text = '-';
		globMusic.stop();
		globWin.play();
		glbthumUp.visible=true;
		txtLvlcomplete.text = 'Fase ' + fase + ' Completa';
		game.time.events.loop(Phaser.Timer.SECOND, endGame, this);

	}
	
}

function gameOver(player){
	globEnemy.play();
	lifecont--;
	txtLife.text = lifecont;
	if (lifecont==1){
		txtLife.style.fill='#f00';
	}
	if (lifecont > 0 && timerPhase>0){
		player.kill();
		game.time.events.add(100, createplayer, this);
	}else{
			
		globMusic.stop();
		globGameOver.play();

		player.kill();
		lifecont = 3;
		timerPhase = 0;
		txtTimer.text = '-';
		txtLvlgameOver.text = 'GAME OVER';
		game.time.events.loop(Phaser.Timer.SECOND, restartLvl, this);

	}
}

function releaseDoor(player, bot){
    bot.kill();
    wall.cursor.kill();   
}

function restartLvl(){

	txtnextLvl.text = 'Reiniciando nivel';
	txtLvlcontnew.text = count;
	count --;
	if (count < 0){
		count = 3;
		score = 0;
		globMusic.stop();
		timerPhase = 30;
		game.state.restart();
	}
	return;	
}


function endGame(){
	timerPhase = 0;
    if (fase==3){
        txtnextLvl.text = 'Parabens Jogo Finalizado';

    }else{
        txtnextLvl.text = 'Próximo nivel em:';
		txtLvlcontnew.text = count;
		
    }
    count --;
	if (count < 0){
		score = 0;
		count = 3;
		globMusic.stop();
		win=false;
        faseC();
		
	}
	return;	
}

function faseC(){
    fase++;

    switch (fase){
        case 2:
            game.state.start('fase2');
            break;
        case 3:
            game.state.start('fase3');
            break;
        case 4:
            game.state.start('menu');
            fase=0;
            break;
   }

    
}


function verifyTime(){
	if(win==false){
		if (timerPhase>0){
			timerPhase = timerPhase - 0.015;
			var x = timerPhase.toFixed(0);
			txtTimer.text = x;
			if (timerPhase<11){
				txtTimer.style.fill='#f00';
			}
			if (timerPhase<=0){
				timerPhase = 0;
				txtTimer.text = '-';
				gameOver(player);
			}
		}
	}
	return;
}

