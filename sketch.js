var population;
var maxjumps = 9;
var generation = 1;
var target;
var objectlist;
var timer = 0;
var fastmode = false;

function setup() {
  createCanvas(1400, 500);
  textSize(32);
  ellipseMode(CENTER);
  population = new Population;
  target = createVector(1100, -130);
}

function draw() {
  background(80, 210, 240);
  setbackground();
  displayInfo();
  if (fastmode) {
    for (var i = 0; i < 600; i++) {
      this.dostuff();
    }
  } else {
    this.dostuff();
  }
}

function mousePressed() {
  fastmode = (fastmode == 0)
}

function updateObjects() {
  objectlist = [[320, -60, 50, 60],
                [425, -120, 50, 120],
                [600, -80, 50, 30],
                [760, -140, 80, 20],
                [900, -80, 200, 80],
                [800, -40, 200, 40],
                [900, -160, 80, 20]];
}

dostuff = function() {
  timer++;
  updateObjects();
  population.run();
  if (population.done()) {
    console.log(population.bups);
    generation += 1;
    population.evaluate();
    population.selection();
    timer = 0;
  }
}

setbackground = function() {
  translate(0, 4 * height / 5);
  fill(240, 240, 5);
  ellipse(target.x, target.y, 50, 50);   // the golden target
  fill(50, 200, 50);
  rect(0, 0, width, height / 5);   // the ground the bups jump on
  updateObjects();
  for (var i = 0; i < objectlist.length; i++) {
      rect(objectlist[i][0], objectlist[i][1], objectlist[i][2], objectlist[i][3]);
  }
}

displayInfo = function() {
  fill(0);
  text("maxfit: ", 50, -4 * height / 5 + 50);
  text((population.maxfit * 10000).toFixed(2), 150, -4 * height / 5 + 50);
  text("generation: " + generation, 300, -4 * height / 5 + 50);
  if (population.besttime != 1000 && generation != 1) {
    text("best time: " + population.besttime, 600, -4 * height / 5 + 50);
  }
  text("fastmode: ", 1150, -4 * height / 5 + 50);
  if (fastmode) {
    fill(255, 0, 0);
    text("ON", 1300, -4 * height / 5 + 50);
  } else {
    text("off", 1300, -4 * height / 5 + 50);
  }
}
