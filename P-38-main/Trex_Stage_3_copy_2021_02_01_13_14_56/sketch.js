var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  trex = createSprite(displayWidth/2,180,20,50);
  
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.velocityX=2
  
 // ground = createSprite(camera.x+100,300,displayWidth*10,20);
 // ground.addImage("ground",groundImage);
 // ground.x = displayWidth /2;
  //ground.velocityX = 3.3;
 // ground.scale=2.6;
  //console.log(ground.velocityX)
  
  gameOver = createSprite(displayWidth/2,displayHeight/4);
  gameOver.velocityX=2;
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(camera.x+600,140);
  restart.velocityX=2;
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(displayWidth/2,300,displayWidth*100,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {



//  camera.position.y=trex.y;
 camera.position.x=trex.x;
 // trex.debug = true;
  background(255);
 // background("brown",displayWidth/2,displayHeight/2)
  stroke("black")
  text("Score: "+ score, camera.x+240,50);

  stroke("red")
  strokeWeight(2)
 // text("Press Right Arrow TO Speed UP",camera.x+50,50)
 stroke("brown")
  line(displayWidth-1300,displayHeight/2.5+12,displayWidth*100,displayHeight/2.5+12)
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
   // ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("Up_Arrow") && trex.y  >= displayHeight/4+50) {
      trex.velocityY = -13;
    }   
         
    trex.velocityY = trex.velocityY + 0.8

    if(trex.y>=190){
      trex.isStatic=true;
    }

    //if(keyCode===RIGHT_ARROW){
    //  trex.x=trex.x+3;
     // gameOver.x=gameOver.x+3;
     // restart.x=restart.x+3
  //  }
  
    // if (ground.x > displayWidth){
    //  ground.x = ground.width/2;
    // }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        trex.velocityX=0
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    restart.velocityX=0;
    gameOver.velocityX=0;
    
    //set velcity of each game object to 0
   // ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    //ground.stop();
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  // if(frameCount%10===0){
  //   ground.x=ground.x+14;
    
  // }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 110 === 0) {
    var cloud = createSprite(displayWidth+camera.x,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -0.3;
    
     //assign lifetime to the variable
    cloud.lifetime = 770;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(displayWidth+camera.x,280,10,40);
   // obstacle.debug = true;
    obstacle.velocityX = -(3 + 0*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 700;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  restart.velocityX=3;
  gameOver.velocityX=3;
 // ground.velocityX = 3.4;
  trex.velocityX=3;
 
  
  score = 0;
  
}