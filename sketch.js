const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var con;
var con2;
var rope;


function preload()
{
  bg_img = loadImage('background_img.png');
  food = loadImage('fish.png');
  gato = loadImage('gatinho_3.png');

  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  move = loadAnimation("gatinho_3.png","gatinho_2.png");
  eat = loadAnimation("gatinho_1.png" , "gatinho_4.png");
  sad = loadAnimation("gatinho_5.png","gatinho_6.png");
  
  move.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(800,500);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fish_options = {
    restitution: 0.8
  }
  
  ground =new Ground(400,height-10,width,20);
  fish = Bodies.circle(200,300,15,fish_options);
  World.add(world,fish);
  
  //sprite do gatinho
  move.frameDelay = 20;
  eat.frameDelay = 20;
  gatinho = createSprite(650,400,80,80);
  gatinho.addImage(gato);
  gatinho.scale = 0.15;

  gatinho.addAnimation('moving',move);
  gatinho.addAnimation('eating',eat);
  gatinho.addAnimation('crying',sad);

  gatinho.changeAnimation('moving');

  rope = new Rope(5,{x:500,y:70});
  rope2 = new Rope(6,{x:250,y:20});
  con = new Link(rope,fish);
  con2 = new Link(rope2,fish);

  //botão 1
  button = createImg('cut_btn.png');
  button.position(490,60);
  button.size(50,50);

  button2 = createImg('cut_btn.png');
  button2.position(240,10);
  button2.size(50,50);

  button.mouseClicked(drop1);
  button2.mouseClicked(drop);

  blower = createImg('balloon.png');
  blower.position(20,180);
  blower.size(135,90);
  blower.mouseClicked(airbloow);
  
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fish!=null){
    image(food,fish.position.x,fish.position.y,70,70);
  }
  pop();

  ground.show();
 
  rope.show();
  rope2.show();

  if(collide(fish,gatinho)==true)
  {
   remove_rope();
    World.remove(engine.world,fish);
    fish = null;
    eating_sound.play()
    gatinho.changeAnimation('eating');
  }

  if(fish!=null && fish.position.y>=450)
  {
    bunny.changeAnimation('crying', sad);
    fish=null;
    sad_sound.play()
   }

  drawSprites();

}

function drop1()
{
  rope.break();
  con.dettach();
  con = null; 
}

function drop()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function airbloow(){
  Matter.Body.applyForce(fish,{x:0, y:0}, {x:0.03, y:0});
  air.play()
}
