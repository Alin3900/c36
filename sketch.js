var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var food;


//crea aquí las variables feed y lastFed 
var feed,lastfed;

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

  //crea aquí el boton Alimentar al perro

  food=createButton("Alimentar al perro! :D");
  food.position(850,100);
  food.mousePressed(feedDog);


  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){ lastFed=data.val(); });
  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  if (lastfed >=12){

text("ULTIMA HORA EN LA QUE SE ALIMENTO" + lastfed %12,350,30);
  }
  else if (lastfed ==0 ){
text("ULTIMA HORA EN LA QUE SE ALIMENTO :12PM", 350,30);
  }
  else{
text("ULTIMA HORA EN QUE SE ALIMENTO" + lastfed %12,350,30);
  }
 
  //escribe el código para mostrar el texto lastFed time aquí

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro


if(foodObj.getFoodStock <= 0){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}
else{
  foodObj.updateFoodStock(foodObj.getFoodStock ()-1);
}
database.ref("/").update({
  Food : foodObj.getFoodStock(),
  FeedTime : hour()
});
}




//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
