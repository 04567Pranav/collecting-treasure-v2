
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var survivalTime=0

var PLAY = 1;
var END = 0;
var gameState= PLAY

function preload(){
  
  
  monkey_running =          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided=loadAnimation("sprite_1.png")
 
}




function setup() {
   
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.addAnimation("collided", monkey_collided)
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10)
  ground.velocityX=-4
  ground.x=ground.width/2
  console.log(ground.x)
  
  FoodGroup=createGroup()
  obstacleGroup=createGroup()
}

function draw() {

 background(255)
  
  stroke("white")
  textSize(20)
  fill("black")
  text("Score: "+score, 100,75);
  
  stroke("black")
  textSize(20)
  fill("black")
  text("SurvivalTime: "+ survivalTime, 100, 50)
  
  if(gameState === PLAY){
  
    survivalTime=Math.ceil(frameCount/frameRate()) 
    
    if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  score=score+1;
}
  
  if(obstacleGroup.isTouching(monkey)){
  gameState=END
}
  
  
  
  
  if(keyDown("space") ) {
      monkey.velocityY=-12
    }
  
  monkey.velocityY = monkey.velocityY+ 0.8 
  }
      if(gameState===END){
      FoodGroup.setVelocityXEach(0)
      obstacleGroup.setVelocityXEach(0)
      monkey.changeAnimation("collided", monkey_collided)
        
        obstacleGroup.setLifetimeEach(-1)
        FoodGroup.setLifetimeEach(-1)
    }
  
    if(ground.x<0){
    ground.x=ground.width/2
  }
  
  monkey.collide(ground)
  spawnbananas()
  spawnobstacles()
  drawSprites();
}

function spawnbananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX=-6
    banana.scale = 0.10;
    
     
    banana.lifetime = 200;
    
    
    FoodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(600,330,10,40);
    obstacle.velocityX = -6
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.10
    obstacle.lifetime=200
    
    obstacleGroup.add(obstacle)
  }
}





