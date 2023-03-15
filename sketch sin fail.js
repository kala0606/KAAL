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


let xspacing; //= WIDTH/60; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0;
let thetaP = 0; // Start angle at 0
let amplitude = 25.0; // Height of wave
let period; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let kaal;

let min;
let hr;



function setup() {
  createCanvas(WIDTH, HEIGHT);
  noiseSeed(seed);
  background(0)

  hr = hour();
  min = minute();
  
  yvalues = new Array(min);

  w = WIDTH;
  period = R.random_int(10,100)
  // dx = (TWO_PI / period) * xspacing;
  // yvalues = new Array(floor(w / xspacing));
  // for(let r = 0; r < hour(); r++){

  //   kaal = new Kaal(r*HEIGHT/hr);
  //   kaal.calcWave();
  //   // kaal.renderWave();

    
  // }

  // setInterval(changeVal, 2000)
  
}


// ---
  
  
function draw() {
  let bcol = color(0);
  bcol.setAlpha(200);
  background(bcol);
  translate(WIDTH/2, HEIGHT/2);
  scale(0.8)
  translate(-WIDTH/2, -HEIGHT/2);

  if(hour()>12) hr = hour() - 12;
  else hr = hour();

  // hr = 9;
  // min = minute();
  xspacing = WIDTH/min;
  // period = R.random_int(10,100)

  dx = (TWO_PI / period) * xspacing;

  yvalues = new Array(min);
  

  for(let r = 0; r < hr; r++){

    kaal = new Kaal(r*HEIGHT/hr);

    // if(second() == 0){
    //   kaal.rearrange();
    // }

    kaal.calcWave();
    kaal.renderWave();

    

    // for(let cl = 0; cl < minute(); cl++){
    //   kaal.drawline(r);
    // }
  }

  
  
  for(let r = 1; r <= hr+1; r++){

    stroke(0);
    strokeWeight(10*M)
    line(0,r*HEIGHT/hr,WIDTH,r*HEIGHT/hr);
  }

  // calcWave();
  // renderWave();
  // console.log(minute(), second())

}

class Kaal{

  constructor(y0){
    this.y0 = y0;

    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(this.y0 + i) * this.y0/100;
      // x += dx;
    }

  }

  calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    if(frameCount%60<50 && frameCount%60>10){
    theta +=  thetaP;
    }

    console.log(second())
    if(second() == 0 || second() == 1){
      for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] --;
        this.x -= dx;
      }
    }

    else{
      // For every x value, calculate a y value with sine function
      this.x = theta;
      for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] += (this.x) * this.y0/100;
        this.x += dx;
      }
    }
  }

  // rearrange() {
  //   for (let i = 0; i < yvalues.length; i++) {
  //     yvalues[i] -= WIDTH/yvalues.length;
  //     this.x -= dx;
  //   }
  //   // console.log("sec" + minute())

  // }

  renderWave() {
    noStroke();
    fill(255);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      // ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
      strokeWeight(0*M)
      stroke(0)
      // for(let i = this.y0; i < HEIGHT/hr; i++){
      //   ellipse(x*xspacing + yvalues[x], i);
      // }
      for(let i = this.y0; i < HEIGHT/hr; i+=10){
        // ellipse(x*xspacing+ yvalues[x] + noise(x/100, this.y0/100, frameCount/100)*1*M, i, 1*M);
      }
      rect( x*xspacing - yvalues[x], this.y0, noise(x/100, this.y0/100, frameCount/100)*1*M, HEIGHT/hr)
    }
}


}

// function changeVal(){

//   // thetaP = R.random_dec()* 0.01;
//   // period = R.random_int(10*M,100*M)
//   // xscpacing = R.random_int(10*M,100*M)
  
//   kaal.rearrange();
  
//   // console.log("sec" + minute())
// }





