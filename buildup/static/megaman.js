var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'megaman');

var jumpButton;
var leftKey;
var rightKey;
var player;
var jumpcount;
var attackButton;
var punching
var hp;
var hpLabel;
var spawnBoss;
var fludd;



var menu = {
  preload: function() {
    game.add.text(200, 300, "Megaman: The Wrath of Fludd", { font: '50px Impact', fill: '#ffffff' });
    game.add.text(500, 400, "press space", { font: '20px Impact', fill: '#ffffff' });
  },

  create: function() {

      space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space.onDown.add(function() {
        game.state.start("main");
      });
  },
};

var gameover = {
  preload: function() {
    game.add.text(200, 300, "game over", { font: '50px Impact', fill: '#ffffff' });
    game.add.text(500, 400, "you suck", { font: '20px Impact', fill: '#ffffff' });
  },
    
  create: function() {
      space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space.onDown.add(function() {
        game.state.start("menu");
      });
  },
};

var gameWin = {
    preload: function() {

        game.add.text(200, 300,"YOU'RE A HERO, or are you?", {font:'50px Impact', fill: '#ffffff' });
        game.add.text(500, 400,"there are two sides to every story", {font: '50px Impact ', fill:'#ffffff'});
        game.load.image('gameWin', '/static/mario crying with FLUDD.png');
    },
  create: function() {
            game.add.sprite(0, 0, 'gameWin');

      space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space.onDown.add(function() {
        game.state.start("menu");
      });
  },
};

var main = {

  preload: function() {
  
      game.load.image('gameWin', '/static/mario_crying_with_FLUDD.png');
      game.load.image('odst', '/static/odst.png');
     
      game.load.image('background', '/static/bg1.png');
      
      
      game.load.image('bluePianta','/static/Piantablue.png');
      
      game.load.image('purplepianta','/static/PurplePianta.png');
      
      
      game.load.image('megamanjump','/static/megamanjump.png');
      
      game.load.spritesheet('megaman_run', '/static/megaman_run.png', 150, 150);
      
      game.load.image('punch','/static/megaman_punch.png');
      
      game.load.image('fludd','/static/fludd.png');
      
      game.state.add("gameover", gameover);

  },
  
  create: function() {
    
      game.add.sprite(0, 0, 'background');
      game.physics.startSystem(Phaser.Physics.ARCADE);
      player = game.add.sprite(100, -1800, 'megaman_run');
      player.animations.add('walk');
      player.animations.play('walk', 7, true);
      game.physics.enable(player, Phaser.Physics.ARCADE);
      
      bluebadguy = game.add.sprite(950,720,'bluePianta');
      game.physics.enable(bluebadguy, Phaser.Physics.ARCADE);
      bluebadguy.body.collideWorldBounds=true;
      bluebadguy.hit = 0; 
  
      
      purplebadguy = game.add.sprite(1000,720,'purplepianta');
      game.physics.enable(purplebadguy, Phaser.Physics.ARCADE);
      purplebadguy.body.collideWorldBounds=true;
  
      purplebadguy.hit = 0;
      game.physics.arcade.gravity.y=1500;
      player.body.collideWorldBounds=true;
      player.anchor.setTo(0.5, 1);
      
       spawnBoss = false;
      fludd = false;
  
      jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      
      leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      jumpcount=0;
      
      attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      
      
      player.anchor.setTo(0.5, 1);

      hpLabel = game.add.text(50,50,'');

     
      hp = 100;
      
      
  },
      
  update: function() {
    hpLabel.setText(Math.floor(hp));
      
      
    if (purplebadguy.alive) { game.physics.arcade.collide(player,purplebadguy,function(player,purplebadguy){
        hp = hp - 1;if (punching)purplebadguy.hit++;
    });
                             
         if (purplebadguy.position.x<300){
          purplebadguy.body.velocity.x = 100;
      }
       if (purplebadguy.position.x>900){
           purplebadguy.body.velocity.x = -100;
       }
                             
        if(purplebadguy.hit===3)
          purplebadguy.destroy();
    }
      if(bluebadguy.alive) {
    game.physics.arcade.collide(player,bluebadguy,function(player,bluebadguy){
        hp = hp - 1;if (punching)bluebadguy.hit++;
        
    });
          
           if (bluebadguy.position.y<20){
          bluebadguy.falling = true
      } else if(!bluebadguy.falling){
      bluebadguy.body.velocity.y = -100
      }
      if (bluebadguy.falling && bluebadguy.position.y>200){
          bluebadguy.falling = false
      }
          
        if(bluebadguy.hit===3)
          bluebadguy.destroy();
  }
      
      if (spawnBoss && fludd && fludd.alive) { game.physics.arcade.collide(player,fludd,function(player,fludd){
        hp = hp - 1;if (punching)fludd.hit++;
    });
         if (fludd.position.x<300){
          fludd.body.velocity.x = 100;
      }
       if (fludd.position.x>900){
           fludd.body.velocity.x = -100;
       }           if (fludd.position.y<20){
          fludd.falling = true
      } else if(!fludd.falling){
     fludd.body.velocity.y = -100
      }
      if (fludd.falling && fludd.position.y>200){
          fludd.falling = false
      }
        
                                                        
        if(fludd.hit===10) {
          fludd.destroy();
            setTimeout(this.win, 1000);
     }
    }
      
        if (hp < 1) {
      game.state.start("gameover");
    }
  if(!bluebadguy.alive&&!purplebadguy.alive&&!spawnBoss){
setTimeout(this.spawn, 2000);
  
   spawnBoss = true; }
      
     
      
      if (attackButton.isDown){
          player.loadTexture('punch')
          punching = true
        } else {
            punching = false;   
        }
      
      player.body.velocity.x = 0;
      
    
      if (!punching){
    if (jumpButton.justPressed() && jumpcount < 1) {
        jumpcount =jumpcount+1;
        player.loadTexture('megamanjump'); 
        player.body.velocity.y = -1000;
        
    }
      if (rightKey.isDown)
      {
          player.body.velocity.x = 275;
          player.scale.x = 1
          if (player.texture.baseTexture.source.name != "megaman_run" && player.body.velocity.y == 0) {
              player.loadTexture('megaman_run');
              player.animations.play('walk', 7, true);
          }
      }
      if (leftKey.isDown)
      {
          player.body.velocity.x = -275;
          player.scale.x = -1
           if (player.texture.baseTexture.source.name != "megaman_run" && player.body.velocity.y == 0) {
              player.loadTexture('megaman_run');
              player.animations.play('walk', 7, true);
          }
      }
      if (player.body.velocity.y === 0){
          jumpcount = 0;
       }
      
      if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {    
          player.loadTexture('odst');
      }
    }
  },
    
    spawn:function(){ fludd = game.add.sprite(0,0,'fludd');
      game.physics.enable(fludd, Phaser.Physics.ARCADE);
      fludd.body.collideWorldBounds=true;
      fludd.hit = 0; },
    
    win: function() {
     game.state.start("gamewin");   
    }
};

game.state.add("menu", menu);
game.state.add("main", main);
game.state.add("gameover", gameover);
game.state.add("gamewin", gameWin);
game.state.start("menu");
