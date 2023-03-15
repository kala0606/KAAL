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

let hr;
let rx = [];

function setup() {
  createCanvas(WIDTH, HEIGHT);
  noiseSeed(seed);

  for(let i = 0; i <= minute(); i++){
    rx[i] = R.random_int(0,WIDTH);
  }
  
}


// ---
  
  
function draw() {

  background(255);
  translate(WIDTH/2, HEIGHT/2);
  scale(0.8)
  translate(-WIDTH/2, -HEIGHT/2);

  if(hour()>12) hr = hour() - 12;
  else hr = hour();

  // if(second() == 0){
  //   for(let i = 0; i <= minute(); i++){
  //     rx[i] = R.random_int(0,WIDTH);
  //   }
  // }

  for(let r = 1; r <= hr; r++){

    // for(let c = 0; c <= minute(); c++){
    //   let x0 = rx[c];
    //   stroke(0);
    //   strokeWeight(2*M);
    //   line(x0, r*HEIGHT/hr, x0, r*HEIGHT/hr - HEIGHT/hr);
    // }

    let kaal = new Kaal(r*HEIGHT/hr);

    kaal.drawline();

    if(second() == 0){
      kaal.rearrange();
    }

    for(let cl = 0; cl < minute(); cl++){
      kaal.drawline(r);
    }
  }

  

  for(let r = 1; r <= hr+1; r++){

    stroke(255)
    strokeWeight(10*M)
    line(0,r*HEIGHT/hr,WIDTH,r*HEIGHT/hr);
  }

// noLoop()
console.log(second(), minute())
}

class Kaal {
  constructor(y0){
    this.y0 = y0;
  }

  rearrange(){
    for(let i = 0; i < minute(); i++){
      rx[i] = R.random_int(0,WIDTH);
    }
  }

  drawline(r){
    

      for(let c = 0; c < minute(); c++){
        let x0 = rx[c];
        stroke(0);
        strokeWeight(5*M);
        line(x0 - sin(frameCount/12) * x0/10, r*HEIGHT/hr, x0 - sin(frameCount/12) * x0/10, r*HEIGHT/hr - HEIGHT/hr);
      }
      
    
  }
}


