var back,background
var nave_img, nave, laser_img,laser;
var meteoro_img;
var gameState = 1;
var gp_meteoro;
var gamestate = 0;
var playButton, playButton_img;
var life_img0,life_img1,life_img2,life_img3;
var life1 = 3;
var gameover_img,gameover;

function preload(){
nave_img = loadImage("Assets/spaceship.png");
back = loadImage("Assets/background 2.png");
meteoro_img = loadImage("Assets/meteoro.png");
playButton_img = loadImage("Assets/PLAY1.png");
life_img0 = loadImage("Assets/life-0.png");
life_img1 = loadImage("Assets/life-1.png");
life_img2 = loadImage("Assets/life-2.png");
life_img3 = loadImage("Assets/life-3.png");
gameover_img = loadImage("Assets/game-over.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
    nave = createSprite(windowWidth/4,windowHeight/2);
    nave.addImage("nave", nave_img);
    nave.scale = 2;
    nave.debug = false;
    nave.setCollider("rectangle",0,0,165,100);

    gp_meteoro = createGroup();
    
    
    playButton = createSprite(windowWidth/2,windowHeight/2,20,20);
    playButton.addImage(playButton_img);
    playButton.scale = 1.5;

    gameover = createSprite(windowWidth/2,windowHeight/2,20,20);
    gameover.addImage(gameover_img);
    
   life = createSprite(windowWidth/8,windowHeight/9,60,60);
   life.addImage("3",life_img3);
   life.addImage("2",life_img2);
   life.addImage("1",life_img1);
   life.addImage("0",life_img0);
   life.scale = 0.5





}

function draw() {
  background(back);
   
   

  if(gameState == 1){
    nave.visible= false;
    gameover.visible = false;
    life.visible = false; 
    gp_meteoro.setVelocityXEach(0);
    playButton.visible= true;
     if(mousePressedOver(playButton)){
      gameState = gameState + 1; 
     }
   }

   if(gameState == 2){
    nave.visible= true;
    life.visible = true; 
    gameover.visible = false;
    playButton.visible= false;
     if(keyDown("w")){
    nave.y = nave.y - 20;
    }
  
    if(keyDown("s")){
    nave.y = nave.y + 20;
    }
  
    if(keyDown("d")){
    nave.x = nave.x + 20;
    }
 
    if(keyDown("a")){
    nave.x = nave.x - 20;
    }
    
    if(life1 == 0){
      gameState = gameState + 1;
      life.changeImage("0")
    }
    if(life1 == 2){
      life.changeImage("2")
    }
    if(life1 == 1){
      life.changeImage("1")
    }
    if(life1 == 3){
      life.changeImage("3")
    }

    if(nave.isTouching(gp_meteoro)){
      life1 = life1 - 1;
      console.log (life1)
      gp_meteoro.destroyEach();
    }
    gerarMeteoros()
   }
   
   if(gameState == 3){
    nave.visible= false;
    playButton.visible= false;
    gameover.visible = true;
    life.visible = true; 
    gp_meteoro.destroyEach();
   }
   
   drawSprites();
  }

function gerarMeteoros(){
  if(frameCount % 50 == 0){
    var R = random(windowHeight/1,windowHeight/4.5);
    
    var meteoro = createSprite(windowWidth/0.5,R,80,80);
    meteoro.addImage("meteoro",meteoro_img);
    meteoro.debug = false;
    meteoro.setCollider("circle",-110,90,90);
    meteoro.scale = 1.7
    meteoro.rotation = 45;
    meteoro.velocityX = -30;
    gp_meteoro.add(meteoro);
  }
}
