function DNA(genes) {
  this.mag = 8;
  this.mutationrate = 0.01;
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < maxjumps; i++) {
      this.genes[i] = p5.Vector.random2D().setMag(this.mag);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length))
    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function() {
    this.mutationrate = 0.01;
    for (var i = 0; i < this.genes.length; i++) {
      if (random() < this.mutationrate) {
        this.mutationrate *= 3;
        this.genes[i] = p5.Vector.random2D().setMag(this.mag);
      }
    }
  }
}
