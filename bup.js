function Bup(dna) {
  this.gravity = createVector(0, 0.3);
  if (dna) {
    this.dna = dna;
  } else {
      this.dna = new DNA;
  }
  this.fitness = 0;
  this.color = [random(255), random(255), random(255)];
  this.size = 20;  // radius of the circle
  this.onground = true; // in a position to jump
  this.againstwall = false;  // sliding against a wall
  this.jumpcount = 0;  // times jumped
  this.cooldown = 0;  // frames to wait after landing
  this.completed = false;
  this.timecompleted = 0;
  this.pos = createVector(100, -this.size / 2);
  this.vel = createVector();
  this.acc = createVector();

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.checkCollision = function() {
    if (this.pos.y > -this.size / 2) {  // checks for ground collision
      this.pos.y = -this.size / 2;
      this.acc.mult(0);
      this.vel.mult(0);
      this.onground = true;
      this.againstwall = false;
    } else {
      this.onground = false;
    }

    if (this.pos.x - this.size / 2 < 0) {  // checks for side collision
      this.pos.x = this.size / 2;
      this.acc.mult(0);
      this.vel.mult(0);
    }
    if (this.pos.x + this.size / 2 > width) {  // checks for side collision
      this.pos.x = width - this.size / 2;
      this.acc.mult(0);
      this.vel.mult(0);
    }
      this.doesCollide();
  }

  this.doesCollide = function() { // well... I tried
    for (var i = 0; i < objectlist.length; i++) {
      rx = objectlist[i][0];
      ry = objectlist[i][1];
      rw = objectlist[i][2];
      rh = objectlist[i][3];
      r = this.size / 2
      if (this.pos.x < rx && this.pos.x + r >= rx // checks left
          && ry <= this.pos.y + r && this.pos.y - r <= ry + rh) {
            this.pos.x = rx - r;
            if (!this.againstwall) {
              this.acc.mult(0);
              this.vel.mult(0);
              this.againstwall = true;
            }
          }
      if (this.pos.y < ry && this.pos.y + r >= ry // checks top
          && rx <= this.pos.x && this.pos.x <= rx + rw) {
            this.pos.y = ry - r;
            this.acc.mult(0);
            this.vel.mult(0);
            this.onground = true;
            this.againstwall = false;
          }
      if (this.pos.x > rx + rw && this.pos.x - r <= rx + rw // checks right
          && ry <= this.pos.y && this.pos.y <= ry + rh) {
            this.pos.x = rx + rw + r;
            if (!this.againstwall) {
              this.acc.mult(0);
              this.vel.mult(0);
              this.againstwall = true;
            }
          }
      if (this.pos.y > ry + rh && this.pos.y - r <= ry + rh // checks bottom...
          && rx <= this.pos.x + r && this.pos.x - r <= rx + rw) {
            this.pos.y = ry + rh + r;
            this.acc.mult(0);
            this.vel.mult(0);
          }
    }
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = 1 / d;

    if (this.completed) {
      this.fitness = 0.05 + 1 / this.timecompleted * 10;
    }
  }

  this.update = function() {
    if (!this.completed) {
      if (dist(this.pos.x, this.pos.y, target.x, target.y) < 25) {
        this.completed = true;
        this.onground = true;
        this.jumpcount = maxjumps;
        this.timecompleted = timer;
        return;
      }
      if (this.onground) {
        if (this.cooldown <= 0) {
          this.applyForce(this.dna.genes[this.jumpcount]);
          this.jumpcount += 1;
          this.cooldown = 0;
        } else {
          this.cooldown -= 1;
        }
      }
      this.applyForce(this.gravity);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(10);
      this.checkCollision();
    }
  }

  this.show = function() {
    c = map(this.jumpcount, 0, maxjumps, 200, 50);
    fill(220, c, 45);
    // d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // c = map(d, 0, width, 230, 0);
    // fill(0, c, 0);
    //fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

}
