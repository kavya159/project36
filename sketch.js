var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and
var fedTime,lastFed,feed
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
fedTime=database.ref('FeedTime')
fedTime.on('value',function(data){
  lastFed=data.val()
})
  if(lastFed>=12){
    text ("last feed="+lastFed%12+'pm',350,30)
  }

  else if(lastFed===0){
    text ("last feed=12 AM",350,30)
  }
  else{
    text ("last feed="+lastFed+'am',350,30)
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var i=foodObj.getFoodStock()
if(i<=0){
  foodObj.updateFoodStock(i*0)
}
  
else{
  foodObj.updateFoodStock(i-1)
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
