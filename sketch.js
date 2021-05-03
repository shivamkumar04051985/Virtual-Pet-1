//Create variables here
var dog,dogImag,happyDogImag,databace,foodS,foodStock;

function preload()
{
	//load images here
  dogImg = loadImage("Dog.png")
  happyDogImg = loadImage("happydog.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  foodStock = database.ref("FoodS");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
background("green");

if(foodS!== undefined){
  textSize(20);
  fill("red");
  text("NOTE: Press UP ARROW to feed DRAGO milk",50,50);
  text("Food Remaining:"+foodS,150,150);

  if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
  }

  if(foodS === 0){
   foodS = 20;
  }
  
 }
 

 drawSprites();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    FoodS:x
  })
}

function readStock(data){
  foodS = data.val();
}





