var backImage,backgr;
var player, player_running;
var ground,ground_img;

var bananaImage;  
var FoodGroup;
var ObstaclesGroup, obstaclesImage;

var END =0;
var PLAY =1;
var gameState = PLAY;

score = 0;

function preload(){
  backImage=loadImage("download.jpg");
  bananaImage = loadImage ("banana.png")
  obstaclesImage = loadImage ("stone.png")
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(500,390);
  
  backgr=createSprite(285,173,100,10);
  backgr.addImage(backImage);
  backgr.scale=2.5;
  backgr.x=backgr.width/1;
  backgr.velocityX=-3;
  
  player = createSprite(100,300,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,320,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group ()
  ObstaclesGroup = new Group ()

  score = 0;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    spawnFood ()  
    spawnObstacles()
  

  if(backgr.x<150){
    backgr.x=backgr.width/1;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  if (FoodGroup.isTouching (player)){
    FoodGroup.destroyEach ();
    score = score + 10;
    player.scale += 0.01;
    
  }

  if (ObstaclesGroup.isTouching (player)){
    gameState = END;
  }
  else if (gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach()
    ObstaclesGroup.destroyEach()

    textSize (30)
    fill ("#9DC9BA")
    stroke ("#ECC578")
    text ("Game Over!", 200, 100)
  }

  drawSprites();
}

function spawnFood (){

  if (frameCount % 100 === 0){
    var banana = createSprite (600, 250, 40, 10) 
    banana.y = random (120, 200)
    banana.addImage (bananaImage)
    banana.scale = 0.03;
    banana.velocityX = -4
    banana.lifetime = 300
    player.depth = banana.depth + 1;
    FoodGroup.add(banana)
  }
 
}

function spawnObstacles (){

  if (frameCount % 200 === 0){
    var obstacles = createSprite (600, 310, 40, 10) 
    obstacles.x = random (120, 300)
    obstacles.addImage (obstaclesImage)
    obstacles.scale = 0.07;
    obstacles.velocityX = -1
    obstacles.lifetime = 300
    player.depth = obstacles.depth + 1;
    ObstaclesGroup.add (obstacles)
  }
 
}

