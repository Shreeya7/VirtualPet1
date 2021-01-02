//Create variables here
    var dogImage1,dogImage2;
    var database;
    var dog;
    var food,foodStock;

function preload()
{
  //load images here
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  
database = firebase.database();

dog = createSprite(400,350,100,100);
dog.addImage(dogImage1);
dog.scale = 0.15;

foodStock = database.ref('Food');
foodStock.on("value",readStock);

}

function draw() {  
  background("lightpink");

  drawSprites();
  //add styles here

  if(keyWentDown(UP_ARROW))
  {
    writeStock(food);
    dog.addImage(dogImage2);
  }
  
  fill("black");
  textSize(15);
  text("Food Remaining : " + food, 600,50);
  text("Press the UP_ARROW key to feed the dog",270,500);

  if(food === 0)
  {
    food = 20;
  }
}

function readStock(data)
{
  food = data.val();
}

function writeStock(x)
{
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
  x = x - 1;
  }
  database.ref('/').update({
    Food : x
  })
}