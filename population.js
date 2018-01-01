function Population() {
  this.bups = [];
  this.popsize = 45;
  this.matingpool = [];
  this.maxfit = 0;

  for (var i = 0; i < this.popsize; i++) {
    this.bups[i] = new Bup;
  }

  this.evaluate = function() {
    this.maxfit = 0;
    this.bestbup = 0;
    this.besttime = 1000;
    for (var i = 0; i < this.popsize; i++) {
      this.bups[i].calcFitness();
      if (this.bups[i].fitness > this.maxfit) {
        this.maxfit = this.bups[i].fitness;
        this.bestbup = i;
      }
      if (this.bups[i].completed && this.bups[i].timecompleted < this.besttime) {
        this.besttime = this.bups[i].timecompleted;
      }
    }

    for (var i = 0; i < this.popsize; i++) {
        this.bups[i].fitness /= this.maxfit;
    }

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.bups[i].fitness *= 100;
      for (var q = 0; q < n; q++) {
        this.matingpool.push(this.bups[i]);
      }
    }
  }

  this.selection = function() {
    var newBups = [new Bup(this.bups[this.bestbup].dna)];
    for (var i = 1; i < this.bups.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newBups[i] = new Bup(child);
    }
    this.bups = newBups;
  }

  this.done = function() { // returns true if all bups have used their jumps.
    for (var i = 0; i < this.bups.length; i++) {
      if (this.bups[i].jumpcount < maxjumps || !this.bups[i].onground) {
        return false;
      }
    }
    return true;
  }

  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.bups[i].update();
      if (!fastmode) {
        this.bups[i].show();
      }
    }
  }
}
