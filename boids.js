// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Boid {
    constructor(j) {
      this.position = createVector(random(width), 175);
      this.velocity = createVector(0.1,0);
      this.ran_velocity = createVector(5,0);
      this.velocity.setMag(random(-10, 10));
      this.acceleration = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 10;
      this.j = j;

      this.rs = R.random_num(0,1);
      this.rsv = R.random_num(1, 2);
      this.rsvb = R.random_num(10, 100);
      // this.minutes = minute();
    }
  
    edges() {
      if (this.position.x > WIDTH-20*M) {
        this.position.x = 0 + 20*M;
      } else if (this.position.x <= 0 + 20*M) {
        this.position.x = WIDTH - 20*M;
      }
      if (this.position.y > DIM - 20*M) {
        this.position.y = 0;
      } else if (this.position.y < 0 + 20*M) {
        this.position.y = height - 20*M;
      }
    }
  
    // align(boids) {
    //   let perceptionRadius = 20;
    //   let steering = createVector();
    //   let total = 0;
    //   for (let other of boids) {
    //     let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    //     if (other != this && d < perceptionRadius) {
    //       steering.add(other.velocity);
    //       total++;
    //     }
    //     // line(this.position.x, this.position.y, other.position.x, other.position.y)
    //     // ellipse(this.position.x, other.position.y, 10*M)
    //   }
    //   if (total > 0) {
    //     steering.div(total);
    //     steering.setMag(this.maxSpeed);
    //     steering.sub(this.velocity);
    //     steering.limit(this.maxForce);
    //   }
    //   return steering;
    // }
  
    // separation(boids) {
    //   let perceptionRadius = 24;
    //   let steering = createVector();
    //   let total = 0;
    //   for (let other of boids) {
    //     let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    //     if (other != this && d < perceptionRadius) {
    //       let diff = p5.Vector.sub(this.position, other.position);
    //       diff.div(d * d);
    //       steering.add(diff);
    //       total++;
    //     }
    //   }
    //   if (total > 0) {
    //     steering.div(total);
    //     steering.setMag(this.maxSpeed);
    //     steering.sub(this.velocity);
    //     steering.limit(this.maxForce);
    //   }
    //   return steering;
    // }
  
    // cohesion(boids) {
    //   let perceptionRadius = 50;
    //   let steering = createVector();
    //   let total = 0;
    //   for (let other of boids) {
    //     let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    //     if (other != this && d < perceptionRadius) {
    //       steering.add(other.position);
    //       total++;
    //     }
    //   }
    //   if (total > 0) {
    //     steering.div(total);
    //     steering.sub(this.position);
    //     steering.setMag(this.maxSpeed);
    //     steering.sub(this.velocity);
    //     steering.limit(this.maxForce);
    //   }
    //   return steering;
    // }
  
    flock(boids) {
      // let alignment = this.align(boids);
      // let cohesion = this.cohesion(boids);
      // let separation = this.separation(boids);
  
      // alignment.mult(alignSlider.value());
      // cohesion.mult(cohesionSlider.value());
      // separation.mult(separationSlider.value());
  
      // this.acceleration.add(alignment);
      // this.acceleration.add(cohesion);
      // this.acceleration.add(separation);
      // for (let other of boids) {
      //   this.x = lerp(this.x, this.position.x, 0.1);
      // }
    }
  
    update() {

    
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      // this.acceleration.mult(0);
    }
  
    show() {

      if (this.rs <= 0.9) var fsw = this.rsv;
      else var fsw = this.rsvb;

      
      

      // else this.velocity.mult(1)
      
      // var aff = map((millis()/1000) % 60, 0, 60, 0, fsw )

      // fsw = aff;

      
      // strokeWeight(1*M);
      // stroke(scol)
      noStroke();
      fill(scol);
      push()
      translate(this.position.x, this.j*(HEIGHT/hr) + HEIGHT/hr/2)
      var r = map(noise(this.position.x/300,this.position.y/300, seconds/300), 0, 1, -PI/15, PI/15)
      rotate(r)
  
      rect(0, 0, 1*M + noise(this.j/10 + this.position.x/100)*fsw*M, HEIGHT/hr-15*M);
      pop()

      // for(var i = 0; i < 10; i++){
      //   push()
      //   translate(this.position.x, this.j*(HEIGHT/hr)+HEIGHT/hr/10*i);
      //   rotate((noise(this.position.x/10,this.position.y/10, frameCount/300)*r1 -1)/r2)

      //   sphere(HEIGHT/hr/20)
      //   pop()
      // }

    }
  }
  