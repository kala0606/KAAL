// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
const rand_seed = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
var tempHash = "0x" + rand_seed(64);


tokenData = {
  hash: tempHash,
  tokenId: "123000456",
};

let hash = tokenData.hash;
let seed = parseInt(tokenData.hash.slice(0, 16), 16);

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8, 16));
      let b = parseInt(uint128Hex.substr(8, 8, 16));
      let c = parseInt(uint128Hex.substr(16, 8, 16));
      let d = parseInt(uint128Hex.substr(24, 8, 16));
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  random_bool(p) {
    return this.random_dec() < p;
  }
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}

let R = new Random(seed);

var DEFAULT_SIZE = 1000;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var DIM = Math.min(WIDTH, HEIGHT);
var M = DIM / DEFAULT_SIZE;

var rows = [];
var hr, mint;
let bcol, scol;
var refr = true;
var refr2 = true;
let alignSlider, cohesionSlider, separationSlider;

let r1, r2;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  // alignSlider = createSlider(0, 2, 1.5, 0.1);
  // cohesionSlider = createSlider(0, 2, 1, 0.1);
  // separationSlider = createSlider(0, 2, 2, 0.1);
  smooth();

  rectMode(CENTER)
  // scale(0.8)
  // if(hour()>12) {
  //   hr = hour() - 12;
  //   bcol = color(255)
  //   scol = color(0)
  
  // }
  // else {
  //   hr = hour();
  //   bcol = color(0)
  //   scol = color(255)
  
  // }

  r1 = R.random_num(0.1,4);
  r2 = R.random_num(1,8);

  setMinute();
  setHour();
  var currSec = second();
  var currMin = minute();
  var currHr = hour();

  
  // setInterval(setMinute, (60-currSec)*1000);
  // setInterval(setHour, (60-currMin)*60*1000 + (60-currSec)*1000);


 

}

function draw() {
  // bcol.setAlpha(1)
  background(bcol);

  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -DIM*2);

  // translate(WIDTH/2, HEIGHT/2)
  scale(0.8)
  translate(-WIDTH/2, -HEIGHT/2)

  

  

  // if(minute() == 0) setHour();

  for(let j = 0; j < hr; j++){
    // for (let i = 0; i < minute(); i++) {
    //   flock.push(new Boid());
    // }
    // rows[j].setup();
    rows[j].anim();

    print(hour(),";", minute(), ";", second(),";", frameRate())  
  }

  // if(minute() ==  0 && second()%2 == 0){
  //   for( let j = 0; j < hr; j++){
  //     fill(scol)
  //     rect(WIDTH/2, j*HEIGHT/hr + HEIGHT/hr/2, WIDTH, HEIGHT/hr-15*M);
  //   }
  // }
  
  // for (let boid of flock) {
  //   boid.edges();
  //   boid.flock(flock);
  //   if(frameCount%60<50 && frameCount%60>10){
  //     boid.update();
  //   }
  //   boid.show();
  // } 

  if(minute() == 0){
    setInterval(setHour(), 1000*60);
    setInterval(setMinute(), 1000*60);

    print("sethour")
    // break;
  }

   if(second() == 0 && frameCount % 60==0){
    setMinute();
    print("eureka")
    // break;
  }


  if(mint == 0){
    noStroke()
    fill(scol)
    scol.setAlpha(!(second()%2) ? 255 : 0);
    
    for( let j = 0; j < hr; j++){
      // fill(bcol)
      // rect(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT)
     
      // scol.setAlpha(sin(frameCount/10*j)*255);
      rect(WIDTH/2, j*HEIGHT/hr + HEIGHT/hr/2, WIDTH, HEIGHT/hr-15*M);
    }
  } 
}

function setHour(){

  refr2 = true;
  
  if(hour()>12) {
    hr = hour() - 12;
    bcol = color(255)
    scol = color(0)
  
  }
  else if(hour()==12) {
    hr = hour();
    bcol = color(255)
    scol = color(0)
  
  }
  else if(hour()==0){
    hr = 12;
    bcol = color(0);
    scol = color(0);
  }
  else {
    hr = hour();
    bcol = color(0)
    scol = color(255)
  
  }

  // hr = 12;

  for(let j = 0; j < hr; j++){
    rows.push(new Row(j))
    
  }

  for (let row of rows) {
    row.setup();
  }

 
}

function setMinute(){
  mint = minute();
  refr = true;
  // mint = 0;

  for (let row of rows) {
    row.addmin();
  }

  // while(second() < 2)
  // for(let j = 0; j < hr; j++){
  //   fill(scol);
  //   push()
  //   translate(WIDTH/2, j*HEIGHT/hr);
  //   rect(0,0, WIDTH, HEIGHT/hr);
  //   pop()
  // }
  

}