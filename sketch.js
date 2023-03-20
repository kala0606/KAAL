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
var hr, mint, sc;
let bcol, scol;
var refr = true;
var refr2 = true;
let lastMinute = -1;
let lastSecond = -1;

let hours
let minutes;
let seconds;

let r1, r2;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  // alignSlider = createSlider(0, 2, 1.5, 0.1);
  // cohesionSlider = createSlider(0, 2, 1, 0.1);
  // separationSlider = createSlider(0, 2, 2, 0.1);

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

  hours = hour();
  minutes = minute();
  seconds = second();
  

  setMinute();
  setHour();
  

  
  // setInterval(setMinute, (60-currSec)*1000);
  // setInterval(setHour, (60-currMin)*60*1000 + (60-currSec)*1000);


 

}

function draw() {
  // bcol.setAlpha(1)
  
  
  // background(bcol);
  smooth();

  // ambientLight(100);
  // directionalLight(255, 255, 255, 0, 0, -DIM*2);

  // translate(WIDTH/2, HEIGHT/2)
  scale(0.8)
  translate(-WIDTH/2, -HEIGHT/2)

  hours = hour();
  minutes = minute();
  seconds = second();

  background(bcol);
  // Increment the seconds variable by 1 every frame
  // if(frameCount%60==0) seconds++;

  // If the seconds variable reaches 60, increment the minutes variable and reset the seconds variable to 0
  // if (seconds === 60) {
  //   minutes++;
  //   seconds = 0;
  // }

  // // If the minutes variable reaches 60, increment the hours variable and reset the minutes variable to 0
  // if (minutes === 60) {
  //   hours++;
  //   minutes = 0;
  // }

  // Display the current time as a string
  let timeString = nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2);
  console.log(timeString); // Print the time string to the console
  // Your code here..
  

  // if(minute() == 0) setHour();
  if(minutes === 0 && seconds%2 == 0){
    // noStroke()
    // let hcol = scol;
    fill(scol)
    // hcol.setAlpha(!(seconds%2) ? 255 : 0);
    
    for( let j = 0; j < hr; j++){
      
      rect(WIDTH/2, j*HEIGHT/hr + HEIGHT/hr/2, WIDTH, HEIGHT/hr-15*M);
    }
  } 

  for(let j = 0; j < hr; j++){
    // for (let i = 0; i < minute(); i++) {
    //   flock.push(new Boid());
    // }
    // rows[j].setup();
    rows[j].anim();

    // print(hour(),";", minute(), ";", second(),";", frameRate())  
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

  // if(minute() == 0 && ){
  //   setTimeout(setHour(), 0);
  //   // setTimeout(setMinute(), 0);

  //   print("sethour")
  //   // break;
  // }

  if (minutes === 0 && minutes !== lastMinute) {
    // Execute the code only if the current minute is 0 and it's a new minute
    console.log("It's a new hour!");
    // Your code here...
    setHour();
    
    // setMinute();
    
    // Update the lastMinute variable to avoid executing the code again until the next hour
    lastMinute = 0;
  } else if (minutes !== lastMinute) {
    // Update the lastMinute variable if it's a new minute
    lastMinute = minutes;
  }

  //  if(second() == 0 && frameCount % 60==0){
  //   setMinute();
  //   print("eureka")
  //   // break;
  // }

  if (seconds === 0 && seconds !== lastSecond) {
    // Execute the code only if the current second is 0 and it's a new second
    // console.log("It's a new minute!");
    // Your code here...
    setMinute();
    
    // Update the lastSecond variable to avoid executing the code again until the next minute
    lastSecond = 0;
  } else if (seconds !== lastSecond) {
    // Update the lastSecond variable if it's a new second
    lastSecond = seconds;
  }


  
}

function setHour(){

  refr2 = true;
  // hr = hours;
  
  if(hours>12) {
    hr = hours - 12;
    bcol = color(255)
    scol = color(0)
  
  }
  else if(hours==12) {
    hr = hours;
    bcol = color(255)
    scol = color(0)
  
  }
  else if(hours==0){
    hr = 12;
    bcol = color(0);
    scol = color(255);
  }
  else {
    hr = hours;
    bcol = color(0)
    scol = color(255)
  
  }

  

  rows.length = 0

  for(let j = 0; j < hr; j++){
    rows.push(new Row(j))
    
  }

  // for (let row of rows) {
  //   row.setup();
  // }

 
}

function setMinute(){
  refr = true;
  mint = minutes;

  
  for (let row of rows) {
    if(row.flock.length == 59) row.flock.length = 0;
    else {
      row.addmin();
    }
  }

}