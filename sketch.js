// Garden Bg related
var gardenBg1,gardenBg1Image;

// Tom cat related
var tomCat
var tomCatSitImageLeft,tomCatWalkImageLeft;
var tomCatSitImageRight,tomCatWalkImageRight;
var tomCatMeowSound;

// JerryMouse related
var jerryMouse,jerryMouseGiftRight,jerryMouseTeaseRight,jerryMouseRightEnd,jerryMouseLeftEnd;

// Other game elements
var edges;

// Sounds used in the game
var forestSound , tomFarGoingSound,frameCountReminderSound,frameCountReminderSound2;


function preload(){

  gardenBg1Image = loadImage("garden.png");

   // Tom cat left related
   tomCatSitImageLeft = loadImage("cat1Left.png");
   tomCatWalkImageLeft = loadAnimation("cat2Left.png" , "cat3Left.png");
   tomCatGiftEnd = loadImage("cat4Left.png");
   

    // Tom cat right related
    tomCatSitImageRight = loadImage("cat1Right.png");
    tomCatWalkImageRight = loadAnimation("cat2Right.png" , "cat3Right.png");

    // jerry mouse right related
    jerryMouseGiftRight = loadAnimation("mouse2Right.png" , "mouse1Right.png");
    jerryMouseTeaseRight = loadAnimation("mouse2Right.png" , "mouse3Right.png");
    jerryMouseRightEnd = loadImage("mouse4Right.png");


    forestSound = loadSound("Forest Ambience sound @ tom&Jerry.mp3");
    tomFarGoingSound = loadSound("Audio_Trimmer_Joiner_20210421122512297.mp3");
    tomCatMeowSound = loadSound("Cat Meow.mp3");

    frameCountReminderSound = loadSound("Frame count reminder sound (mp3cut.net).wav");
    frameCountReminderSound2 = loadSound("RandomCalling (mp3cut.net).wav")


    
  




}






function setup() {
  createCanvas(windowWidth,windowHeight);

  // Creating the edges
  edges = createEdgeSprites();

  forestSound.play();
  forestSound.loop();

  // Creating the garden background
   gardenBg1 = createSprite(windowWidth/2,windowHeight/4.9,windowWidth,windowHeight);
   gardenBg1.addImage(gardenBg1Image);
   gardenBg1.scale = 1.31;



    // Creating tomCat
    tomCat = createSprite(windowWidth/1.2,windowHeight/1.26);
    tomCat.scale = 0.12;
    //tomCat.debug = true;
  

    // Tom cat move/sit left related
    tomCat.addImage("sitLeft",tomCatSitImageLeft);
    tomCat.addAnimation("walkLeft",tomCatWalkImageLeft);

    // Tom cat move/sit right related
    tomCat.addImage("sitRight",tomCatSitImageRight);
    tomCat.addAnimation("walkRight",tomCatWalkImageRight);

    // When touching the gift 
    tomCat.addImage("leftEnd",tomCatGiftEnd);



    // Creating the jerry mouse right related
    jerryMouse = createSprite(windowWidth/6,windowHeight/1.2);
    jerryMouse.addAnimation("gift",jerryMouseGiftRight);
    jerryMouse.addAnimation("tease",jerryMouseTeaseRight);

    jerryMouse.addImage("rightEnd",jerryMouseRightEnd);
    jerryMouse.scale = 0.095;
    jerryMouse.frameDelay = 9;






}

function draw() {
  background(220);

   // Tom Cat's collision 
   tomCat.collide(edges);

   // Adjusting the depth of the tomCat and jerryMouse
   tomCat.depth = jerryMouse.depth;
   tomCat.depth += tomCat.depth;


  


  //   MOving left tomcat
   if(keyDown("left")&&tomCat.isTouching(jerryMouse) === false){
     tomCat.changeAnimation("walkLeft",tomCatWalkImageLeft);
     tomCat.scale = 0.17;
     tomCat.x = tomCat.x - 8;
     tomCat.setCollider("rectangle",120,0,1000,500);

     jerryMouse.changeAnimation("tease",jerryMouseTeaseRight);



   }

   if(keyWentUp("left")&&tomCat.isTouching(jerryMouse) === false){
     tomCat.changeAnimation("sitLeft",tomCatSitImageLeft);
     tomCat.scale = 0.12;
     tomCat.setCollider("rectangle",120,0,1000,500);

     jerryMouse.changeAnimation("gift",jerryMouseGiftRight);




   }



   // moving right tomcat
   if(keyDown("right")){
    tomCat.changeAnimation("walkRight",tomCatWalkImageRight);
    tomCat.scale = 0.17;
    tomCat.x = tomCat.x + 8;
    tomCat.setCollider("rectangle",120,0,1000,500);

    jerryMouse.changeAnimation("tease",jerryMouseTeaseRight);



  }

  if(keyWentDown("right")&&frameCount%300!=0){
    tomFarGoingSound.stop();
    tomFarGoingSound.play();

  }

  if(keyWentUp("right")){
    tomCat.changeAnimation("sitRight",tomCatSitImageRight);
    tomCat.scale = 0.12;
    tomCat.setCollider("rectangle",120,0,1000,500);

    jerryMouse.changeAnimation("gift",jerryMouseGiftRight);




  }


  // Tomcat touching mouse 
  

   
  //  if(tomCat.isTouching(jerryMouse)){
  //   tomCat.changeAnimation("leftEnd",tomCatGiftEnd);
  //   tomCat.scale = 0.15;

  //   jerryMouse.changeAnimation("rightEnd",jerryMouseGiftRight);


  // }

  if(tomCat.x - jerryMouse.x < (tomCat.width )/2){
    tomCat.changeAnimation("leftEnd",tomCatGiftEnd);
      tomCat.scale = 0.15;
  
      jerryMouse.changeAnimation("rightEnd",jerryMouseGiftRight);

  }












  // if(tomCat.x - jerryMouse.x < tomCat.width/2 +jerryMouse.width/2 && jerryMouse.x - tomCat.x < tomCat.width/2 + jerryMouse.width/2){
  //   tomCat.changeAnimation("leftEnd",tomCatGiftEnd);
  //   tomCat.scale = 0.15;

  //   jerryMouse.changeAnimation("rightEnd",jerryMouseGiftRight);

  // }
  // else{
    
    
    
  // }
 

  // if(keyWentDown("left")&&tomCat.isTouching(jerryMouse)){
  //   tomCatMeowSound.stop();
  //   tomCatMeowSound.play();
  // }

  if(keyWentUp("left")&&tomCat.isTouching(jerryMouse)){
    tomCatMeowSound.stop();
    tomCatMeowSound.play();
  }



  if((frameCount%300===0)&&tomCat.isTouching(jerryMouse)===false){
    tomFarGoingSound.stop();
    
    randomCall = Math.round(random(1,2));

    switch(randomCall){
      case 1:
        frameCountReminderSound.play();
        break;

      case 2:
        frameCountReminderSound2.play();
       
        
    }

   
    
  }




   








  
  drawSprites();
}