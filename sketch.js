var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup,Banana,Obstacles;
var ground,groundAnimation;
var survialTime = 0;
var score = 0;
var invisibleGround;
var gameState = PLAY;
var END =0;
var PLAY =1;
var gameover,gameoverImg;
var invisibleGround;


function preload(){
  
  monkey_running =                    loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  groundAnimation= loadAnimation("ground.png");
  
  gameoverImg = loadAnimation("gameover.jpg");
  
}

function setup() {
  createCanvas(600,300);
  ground = createSprite(400,350,0,0);
  ground.velocityX = -4;
  ground.addAnimation("ground.png",groundAnimation);
  ground.scale = 2;
  ground.x = ground.width/2
 
  monkey = createSprite(80,260,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.15;
  monkey.velocityX =0;
  monkey.velocityY=0;
  
  gameover = createSprite(300,150,0,0);
  gameover.addAnimation("gameover.jpg",gameoverImg);
  gameover.scale = 0.9;
  
  invisibleGround = createSprite(300,300,600,5);
  invisibleGround.visible = false;
 
  console.log(monkey.y);
  
   obstacleGroup = new Group();
   bananaGroup = new Group();
  
  var survivalTime=0;
  var score = 0;
  var O;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug =false;
}


function draw() {
  
  
  if(gameState===PLAY);{
    
   obstacleGroup.visible = true;
    bananaGroup.visible = true;
    gameover.visible = false;
    
  
    ground.velocityX = -(4+3* survialTime/50);
    
    monkey.changeAnimation("moving",monkey_running);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate()) ;
    text("survival Time"+ survialTime,100,50);
    
     
    if(ground.x<0){
      ground.x = ground.width/2
  }
      ground.velocityX= -2;
 
   if(keyDown("space")){
      monkey.velocityY=-12;
  
  }
   monkey.velocityY = monkey.velocityY +0.8;
    
   if(bananaGroup.isTouching(monkey)){
      score = score+1;
      bananaGroup.destroyEach();
      
    }
  
 
    Banana();
    Obstacles();
  
  }

    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      
      
    
    }else if (gameState === END){
    monkey.velocityX = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
      gameover.visible = true;
      monkey.visible = false;
     survialTime.visible=false;
  
      
      
    

      
}
    
  
   monkey.collide(invisibleGround);
  monkey.collide(obstacleGroup);
  drawSprites(); 
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score:"+score,500 , 30);
  
   stroke("black");
    textSize(20);
    fill("black");
   text("survival Time"+ survivalTime,100,50);
  
 
    

}
function Obstacles(){
  if(frameCount % 80 === 0){
    var obstacle = createSprite(400,287,10,10);
    console.log(obstacle.y);
    obstacle.scale = 0.1
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -10;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
    }
  }

function Banana(){
  if(frameCount % 100 ===0){
    var banana = createSprite(595,200,40,10);
    console.log(banana.y);
    banana.addImage(bananaImage);
    banana.velocityX = -7;
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    bananaGroup.add(banana);
    banana.lifetime = 200;
  }
}







