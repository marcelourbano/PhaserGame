var game = new Phaser.Game(800,600,Phaser.CANVAS);

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('fase1',f1State);
game.state.add('fase2',f2State);
game.state.add('fase3',f3State);

game.state.start('boot');