var platforms, player, glbthumUp,timerPhase = 30, gbclouds, win =false, vol = 0.05;
var keys,stars,globSndStar, globWin, globJump, globMusic, globGameOver, txtScore, txtLvlcomplete, count = 3; contfim = 0; fim = 12, score = 0, side = 'left';
var keySp,keyA,keyD;


var f2State = {
	 create: function(){
		//Associa o áudio à sua variável
		globSndStar = game.add.audio('sndStar');
		globSndStar.volume=0.2;
		globMusic = game.add.audio('music');
		globMusic.volume = vol;
		globJump = game.add.audio('sndjump');
		globJump.volume=0.05;
		globGameOver = game.add.audio('sndGameOver');
		globGameOver.volume=1;
		globWin = game.add.audio('sndFim');
		globWin.volume=1;

		//inicia a musica do game
		globMusic.play();



	
		keys = game.input.keyboard.createCursorKeys();
		
		keySp = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

		keyO = game.input.keyboard.addKey(Phaser.Keyboard.O);
		keyL = game.input.keyboard.addKey(Phaser.Keyboard.L);
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0,0,'sky');
		
		//nuvens
		gbclouds = game.add.group();
		gbclouds.enableBody=true;
		var	cloud = gbclouds.create(-350, 50, 'cloud');
			cloud.scale.setTo(3,2);
		var	cloud = gbclouds.create(-50, 50, 'cloud');
			cloud.scale.setTo(2,2);
		var	cloud = gbclouds.create(250	, 50, 'cloud');
			cloud.scale.setTo(3,2);
		var	cloud = gbclouds.create(650	, 50, 'cloud');
			cloud.scale.setTo(2,2);

        
        //parede 
        wall = game.add.group();
        wall.enableBody=true;

        var door =wall.create(400,0,'imgWall');
            door.scale.setTo(0.6, 4.5);
            door.body.immovable = true;

         //parede 
         button = game.add.group();
         button.enableBody=true;
 
         var bot =button.create(700,520,'imgWall');
             bot.scale.setTo(2, 0.5);
             bot.body.gravity.y = 300;
 

		//plataformas
		platforms = game.add.group();
		platforms.enableBody = true;
		
		
	
		var platform = platforms.create(0,game.world.height - 64,'platform');
			platform.scale.setTo(2,2);
			platform.body.immovable = true;
			
			platform = platforms.create(400,400,'platform');
			platform.body.immovable = true;

			platform = platforms.create(-125,275,'platform');
			platform.body.immovable = true;
			
			platform = platforms.create(400,125,'platform');
			platform.body.immovable = true;

		// estrelas
		stars = game.add.group();
		stars.enableBody = true;
		
		for(var i = 0; i < fim; i++){
			var star = stars.create(i*70,0,'star');
				star.body.gravity.y = 300;
				star.body.bounce.y = 0.7 + (Math.random()*0.2);
		}

		//player	
		player = game.add.sprite(50,game.world.height - 150,'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 400;
		//player.body.bounce.y = 0.2;
		player.body.collideWorldBounds = true;
		player.animations.add('left',[0,1,2,3],10,true);
		player.animations.add('right',[5,6,7,8],10,true);
		
		//thumbUP Win
		glbthumUp = this.add.image(325,175,'thumbUp'); 
		glbthumUp.visible=false;

		//textos
		txtScore = game.add.text(16,16,'SCORE: 0',{fontSize:'32px',fill:'#fff'});
		txtTimer = game.add.text(380,14,timerPhase=30,{fontSize:'40px',fill:'#ff0'});
		txtLifetxt = game.add.text(650, 16,'LIVES: ',{fontSize:'32px',fill:'#fff'});
		txtLife = game.add.text(765, 16,'3',{fontSize:'32px',fill:'#fff'});
		

		//fase completa
		txtLvlcomplete = game.add.text(175,320,'',{fontSize:'60px',fill:'#ff0'});
		//game over
		txtLvlgameOver = game.add.text(160,300,'',{fontSize:'80px',fill:'#f00'});
		//contador
		txtLvlcontnew = game.add.text(520,380,'',{fontSize:'60px',fill:'#f60'});
		//proximo nivel em
		txtnextLvl = game.add.text(250,400,'',{fontSize:'30px',fill:'#f60'});



		//game.debug.soundInfo(globMusic, 20, 32);
	},
	
	update: function(){
		//ajustando volume do jogo
		if(keyL.isDown){
			vol = vol - 0.01;
			if (vol < 0){
				vol = 0;	
			}
			globMusic.volume = vol;
		}
		if(keyO.isDown){
			vol = vol + 0.01;
			if (vol > 1){
				vol = 1;	
			}
			globMusic.volume = vol;
		}
		//volume da estrela
		
		//volume do salto



		//colisoes
		game.physics.arcade.collide(player,platforms);
        game.physics.arcade.collide(stars,platforms);
        game.physics.arcade.collide(button,platforms);
        game.physics.arcade.overlap(button,player,releaseDoor);
        game.physics.arcade.overlap(player,stars,collectStar);
        game.physics.arcade.collide(player,wall);
        
        //if (game.physics.arcade.collide(player,button)){
          //  releaseDoor(button);
       // }


		//movimento nuvens
		cloudsmove();
		
		
		//movimentacao player
		player.body.velocity.x = 0;
		if(keys.left.isDown || keyA.isDown){
			player.body.velocity.x = -150;
			player.animations.play('left');
		} else
		if(keys.right.isDown || keyD.isDown){
			player.body.velocity.x = 150;
			player.animations.play('right');
		} else {
			player.animations.stop();
			player.frame = 4;
		}
		

		if((keys.up.isDown || keySp.isDown) && player.body.touching.down){
			globJump.play();
			player.body.velocity.y = -375;
		}



		//contador de tempo
		verifyTime();
		
		
	}
};

