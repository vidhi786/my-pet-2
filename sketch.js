var dog, dogImg, happydog, database, foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happydog = loadImage("dogImg1.png");

  
}

function setup() {
	createCanvas(1000,500);
  
  database = firebase.database();

  food = new Food();

  

  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);


  dog = createSprite(830,250, 50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;


  feedPet = createButton('Feed the Dog');
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  

  background(46,139,87);
  food.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  
  fill('white');
  text("Food Stock : " + foodS, 400, 20);
  

  
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: " + lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12 AM", 350, 30);
  }
  else{
    text("Last Feed: " + lastFed + "AM", 350, 30);
  }
  drawSprites();

}

function readStock(data){
   foodS = data.val();
   food.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happydog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    food:food.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  food.updateFoodStock();
  database.ref('/').update({
    food : foodS
  })
  
}


