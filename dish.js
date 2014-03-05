var Dish = function(input) {
  this.cells = this.buildLiveCells(input);
  this.step();
};

function parseKey(str) {
  return str.split(',').map(function(l) {
    return parseInt(l, 10);
  });
}

function makeKey(arr) {
  return arr[0] + ',' + arr[1];
}

function neighbours(x, y) {
  return [[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y], [x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]];
}

Dish.prototype.step = function() {
  this.cells = this.buildLiveCells(this.calculateNextGeneration());
  this.print();
}

Dish.prototype.cellList = function() {
  return Object.keys(this.cells);
}

Dish.prototype.buildLiveCells = function(input) {
  var cells = {};
  input.forEach(function(l) {
    cells[makeKey(l)] = true;
  }, this);
  return cells;
};

Dish.prototype.cellsWithSurrounding = function() {
  var res = {};
  this.cellList().forEach(function(c) {
    res[c] = true;
    var l = parseKey(c);
    neighbours(l[0], l[1]).forEach(function(n) {
      res[makeKey(n)] = true
    }, this);
  }, this);
  return Object.keys(res);
};

Dish.prototype.calculateNextGeneration = function() {
  var nextGen = [];
  
  this.cellsWithSurrounding().forEach(function(c) {
    var l = parseKey(c);
    var count = this.calculateNumberOfLiveNeighbours(l);
    var isAlive = !!this.cells[c]
    
    // Rule 2 || Rule 4
    if((isAlive && (count === 2 || count === 3)) || (!isAlive && count === 3)) {
      nextGen.push(l);
    }
  }, this);
  
  return nextGen;
};

Dish.prototype.calculateNumberOfLiveNeighbours = function(l) {
  var that = this;
  return neighbours(l[0], l[1]).reduce(function(total, n) {
    return (that.cells[makeKey(n)]) ? total + 1 : total;
  }, 0);
};

Dish.prototype.print = function() {
  console.log('Active cells:');
  this.cellList().forEach(function(c) {
    console.log(c);
  });
};

// TODO: Cell class with x, y?
// TODO: Print

module.exports = Dish;