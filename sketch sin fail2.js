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

let ohr;
let hr, min, sec;
let x0 = [];
let d0 = [];
let pend = true;



function setup() {
  createCanvas(DIM, DIM);
  noiseSeed(seed);
  background(0);
  stroke(255);

  translate(WIDTH/2, HEIGHT/2);
  scale(0.8)
  translate(-WIDTH/2, -HEIGHT/2);

  ohr = hour();
  min = 40//minute();
  sec = second();

   if(hour()>12) ohr = hour() - 12;
  else ohr = hour();

  for(let l = 0; l < ohr; l++){
    x0[l] = []
    for(let k = 0; k < min; k++){
      x0[l][k] = R.random_int(0, DIM)
    }
  }

  for(let l = 0; l < ohr; l++){
    d0[l] = []
    for(let k = 0; k < min; k++){
      d0[l][k] = R.random_int(0, 10*M)
    }
  }

  // for(let l = 0; l < ohr; l++){
  //   x1[l] = []
  //   for(let k = 0; k < min; k++){
  //     x1[l][k] = R.random_int(0, DIM)
  //   }
  // }

  for(let i = 0; i < ohr; i++){
    for(let j = 0; j < min; j++){
      line(x0[i][j], i*HEIGHT/(ohr), x0[i][j], (i+1)*HEIGHT/(ohr))
      // line(50, HEIGHT/(i+1), 50, HEIGHT/(i+2))
    }
  }
  
  // setInterval(secRea, 60000)
  
}


// ---
  
  
function draw() {
  let bcol = color(0);
  bcol.setAlpha(250);
  background(bcol);
  translate(DIM/2, DIM/2);
  scale(0.8)
  translate(-DIM/2, -DIM/2);

  

  // for(let l = 0; l < ohr; l++){
  //   x0[l] = []
  //   for(let k = 0; k < min; k++){
  //     x0[l][k] = R.random_int(0, DIM)
  //   }
  // }
  hr = hour();
  min = 40//minute();
  sec = second();

  if(sec == 0){
    secRea();
  }

  if(hour()>12) hr = hour() - 12;
  else hr = hour();

  let xd = 0;

  for(let i = 0; i < hr; i++){
    let x;
    for(let j = 0; j < min; j++){
      let nx;
      // xd = xd + (x0[i][j] - x1[i][j])/60

      if(frameCount%60<40 && frameCount%60>20){


      x = x0[i][j] + (d0[i][j] + frameCount/10) * d0[i][j];

      if(x > WIDTH) { x = x0[i][j] - (d0[i][j] + frameCount/10) * d0[i][j]; }
      else if(x < 0) { x = x0[i][j] + (d0[i][j] + frameCount/10) * d0[i][j]; }

      nx = x;

      }
      else x = nx;
      
      line(x, i*DIM/(hr) + 5*M, x, (i+1)*DIM/(hr) - 5*M)
      // line(50, HEIGHT/(i+1), 50, HEIGHT/(i+2))
    }
  }




}

function secRea(){

  
    for(let l = 0; l < hr; l++){
      x0[l] = []
      for(let k = 0; k < min; k++){
        x0[l][k] = R.random_int(0, DIM)
      }
    }

    for(let l = 0; l < hr; l++){
      d0[l] = []
      for(let k = 0; k < min; k++){
        d0[l][k] = R.random_num(0, 10*M)
      }
    }
  

}


