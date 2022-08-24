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
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie1, zombie2, zombie3, zombie4, sadzombie;
var breakButton;
var backgroundImage;
var acabar = false

var stones = [];
var collided = false;

function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  sadzombie = loadImage("./assets/sad_zombie.png");

  backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  zombie = createSprite(width / 2, height - 100, 50, 50);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addImage("sad", sadzombie);

  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("BOTÃO");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  //breakButton.mouseClicked(handleButtonPress);
  breakButton.mousePressed(handleButtonPress);
  //breakButton.mouse(handleButtonPress);
  //breakButton.mousePressed(ButtonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();


  for (let i = 0; i <stones.length; i++) {
    stones[i].show();
    morrer(i)
    if(acabar){
      World.add(world, stones[i].body)
      //stones.splice[i,1]
    }
    
  }
  drawSprites()
}

function morrer(i){
  let pos = stones[i].body.position
    if(dist(pos.x, pos.y, zombie.x, zombie.y) <= 65){
      //stones.body.remove()
      //stones = []
      acabar = true
      zombie.changeAnimation("sad")
      zombie.velocityX = 0
      acabar = true
      setTimeout(() => {
        zombie.remove();
      }, 3000)
      return true
    }else{
      if(zombie.x <= 200){
        zombie.velocityX = 10
        zombie.changeAnimation("lefttoright")
      }else{
        if(zombie.x >= width -200){
          zombie.velocityX = -10
          zombie.changeAnimation("righttoleft")
        }
      }
      return false
    }
}
function handleButtonPress() {
  /*jointLink=dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);*/

  /*jointLink.dettach();
  setTimeout(() => {
    break();
  }, 1500);*/

  /*jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 5);*/

  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 5000);
}
