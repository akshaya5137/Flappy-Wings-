var bird,birdImg;
var bg,bgImg;
var obstacle1, obstacle2;
var obs1Group, obs2Group;
var reset, resetImg;
var start, startImg;
var score = 0;
var life = 10;
var checkPointSound;
var gameState = "info";

function preload(){
birdImg = loadImage("Birdy.png");
bgImg = loadImage("bg.png");
obstacle1Img = loadImage("obs1.png");
obstacle2Img = loadImage("obs2.png");
resetImg = loadImage("reset.png");
startImg = loadImage("Start.png");
checkPointSound = loadSound("ding.mp3")
}

function setup() {
  createCanvas(400, 400);

  bg = createSprite(0,100,800,400);
  bg.addImage("bg",bgImg);
  bg.scale = 1;
  
  bird = createSprite(55,200,50,50);
  bird.addImage("bird",birdImg);
  bird.scale = 0.1;
  
  reset = createSprite(200,250,50,50);
  reset.addImage("reset",resetImg);
  reset.scale = 0.15;
  
  start = createSprite(200,255,50,50);
  start.addImage("start",startImg);
  start.scale = 0.15;
  
  obs1Group = new Group();
  obs2Group = new Group();
}

function draw() {
  background("lightblue");
  
  if(gameState==="info"){
     start.visible=true;
    reset.visible = false;
    bird.visible = false;
    
    if(mousePressedOver(start)){
      startGame();
    }
  }
  
  if(gameState==="play"){
  
  bg.velocityX = -3;
    
  bird.visible = true;
  
  if(bg.x<0){
    bg.x = bg.width/2;
  }

  if(bird.y>400){
    gameState="reset";
  }
  
  if(frameCount%45===0){
    score++
  }
    
    if(score>0 && score%10 === 0){
       checkPointSound.play();
    }
  
  if(bird.isTouching(obs1Group) || bird.isTouching(obs2Group)){
    life--
    obs1Group[0].destroy();
    obs2Group[0].destroy();
  }
    
    start.visible=false;
    reset.visible = false;
  
  if(keyDown("space")){
    bird.velocityY = -4;
  }
  
  bird.velocityY = bird.velocityY+0.2;
  
    if(life===0){
      gameState="reset";
    }
    
  spawnObstacle1();
  spawnObstacle2();
  }
  
  if(gameState==="reset"){
    reset.visible = true;
    obs1Group.destroyEach();
    obs2Group.destroyEach();
    bg.velocityX = 0;

    if(mousePressedOver(reset)){
      restart();
    }
    
    text("GAME OVER",200,200);
  }
  
  drawSprites();
  
  fill("green");
  textSize(20);
  stroke("white");
  strokeWeight(1);
  
  if(gameState === "info"){
    text("Press the space bar on your keyboard",30,50);
    text("to make the bird fly.",110,73);
    text("You have ten lives and when in contact",25,110);
    text("with one of the obstacles",90,133);
    text("you lose a life.",130,155);
    text("Your score increases once you cross",35,190);
    text("pass through each obstacle.",80,213);
  }
  
  if(gameState === "play"){
    text("Score: "+score,20,30);
    text("Life: "+life,317,30);
  }
  
  if(gameState === "reset") {
    text("Score: "+score,20,30);
    text("Life: "+life,317,30);
    text("You're final score is "+score+".",100,130);
  text("Click on the reset button to start again!",30,153);
    text("Good luck!",150,177);
  }
}

function spawnObstacle1(){
  if(frameCount%30===0){
    var obstacle1 = createSprite(400,Math.round(random(-50,0)),10,Math.round(random(50,100)));
    obstacle1.addImage("obstacle1",obstacle1Img);
    obstacle1.scale = 0.3
    obstacle1.velocityX = -5;
    obs1Group.add(obstacle1);
    obs1Group.debug=true;
  }
}

function spawnObstacle2(){
  if(frameCount%30===0){
    var obstacle2 = createSprite(400,Math.round(random(400,450)),10,Math.round(random(50,100)));
    obstacle2.addImage("obstacle2",obstacle2Img);
    obstacle2.scale = 0.17;
    obstacle2.velocityX = -5;
    obs2Group.add(obstacle2);
  }
}
  
function startGame(){
  gameState = "play";
}

function restart(){
  gameState = "play";
  score = 0;
  life = 10;
  bird.x = 55;
  bird.y = 200;
}