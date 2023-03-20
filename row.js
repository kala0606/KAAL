// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Row {
    constructor(j) {
      // this.minutes = minute()
      this.flock = [];
      this.j = j;
      // this.minutes = minute();
      // for(let j = 0; j <= hour(); j++){
        this.setup();
        
    }

    setup(){
      // this.flock.length = 0;
      for (let i = 0; i < mint; i++) {
        this.flock.push(new Boid(this.j));
      // }
  
      // startHour = hour();
      }
    }

    addmin(){
      this.flock.push(new Boid(this.j));
    }
  
    anim() {
      for (let boid of this.flock) {
        boid.edges();
        // boid.flock(this.flock);
        if(frameCount%60<40 && frameCount%60>30){
          boid.flock(this.flock);
          boid.update();
        }
        boid.show();
      }  
    }
  
 
  
    update() {

      
     
    }
  
    // show() {
    //   strokeWeight(0);
    //   stroke(255);
    //   push()
    //   translate(this.position.x, this.position.y)
    // //   rotate(sin(frameCount/200)/10)
    //   rect(0, 0, 1, 100);
    //   pop()
    // }
  }
  