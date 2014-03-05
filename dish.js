var Dish = function(input) {
  this.setLiveCells(input);
  this.calculateNextGeneration();
};

function parseKey(str) {
  return str.split('-').map(function(l) {
    return parseInt(l, 10);
  });
}

function makeKey(arr) {
  return arr[0] + '-' + arr[1];
}

function neighbours(x, y) {
  return [[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y], [x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]];
}

Dish.prototype.setLiveCells = function(input) {
  this.cells = {};
  input.forEach(function(l) {
    this.cells[makeKey(l)] = true;
  }, this);
};

Dish.prototype.cellsWithSurrounding = function() {
  var res = {};
  Object.keys(this.cells).forEach(function(c) {
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
  
  console.log('Next generation:');
  
  this.cellsWithSurrounding().forEach(function(c) {
    var l = parseKey(c);
    var count = this.calculateNumberOfLiveNeighbours(l);
    var isAlive = !!this.cells[c]
    
    // Rule 2 || Rule 4
    if((isAlive && (count === 2 || count === 3)) || (!isAlive && count === 3)) {
      console.log(l.join(','));
      nextGen.push(l);
    }
  }, this);
  
  this.setLiveCells(nextGen);
};

Dish.prototype.calculateNumberOfLiveNeighbours = function(l) {
  var that = this;
  return neighbours(l[0], l[1]).reduce(function(total, n) {
    return (that.cells[makeKey(n)]) ? total + 1 : total;
  }, 0);
};

// TODO: Cell class with x, y?
// TODO: Print

module.exports = Dish;