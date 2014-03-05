var Cell = require('./cell');

var Dish = function(input) {
  this.cells = this.buildLiveCells(input);
};

Dish.prototype.simulate = function(generations) {
  for(var i = 0; i < generations; i++) {
    this.cells = this.buildLiveCells(this.calculateNextGeneration());
    this.print(i + 1);
  }
}

Dish.prototype.eachCell = function(cells, f) {
  if(f === undefined) {
    f = cells;
    cells = this.cells;
  }
  
  Object.keys(cells).forEach(function(k) {
    f.call(this, k, cells[k]);
  }, this);
}

Dish.prototype.buildLiveCells = function(input) {
  var cells = {};
  input.forEach(function(l) {
    var cell = new Cell(l[0], l[1]);
    cells[cell.key()] = cell;
  }, this);
  return cells;
};

Dish.prototype.cellsWithSurrounding = function() {
  var res = {};
  this.eachCell(function(k, c) {
    res[k] = c;
    c.neighbours().forEach(function(n) {
      res[n.key()] = n;
    }, this);
  });
  return res;
};

Dish.prototype.calculateNextGeneration = function() {
  var nextGen = [];
  
  this.eachCell(this.cellsWithSurrounding(), function(k, c) {
    var count = this.calculateNumberOfLiveNeighbours(c);
    var isAlive = !!this.cells[c.key()]
    
    // Rule 2 || Rule 4
    if((isAlive && (count === 2 || count === 3)) || (!isAlive && count === 3)) {
      nextGen.push([c.x, c.y]);
    }
  });
  
  return nextGen;
};

Dish.prototype.calculateNumberOfLiveNeighbours = function(cell) {
  var that = this;
  return cell.neighbours().reduce(function(total, n) {
    return (that.cells[n.key()]) ? total + 1 : total;
  }, 0);
};

Dish.prototype.print = function(gen) {
  console.log('Generation %s:', gen);
  this.eachCell(function(k) {
    console.log(k);
  });
};

module.exports = Dish;