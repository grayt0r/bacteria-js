var Cell = function(x, y) {
  this.x = x;
  this.y = y;
};

function neighbours(x, y) {
  return [[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y], [x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]];
}

Cell.prototype.key = function() {
  return this.x + ',' + this.y;
};

Cell.prototype.neighbours = function() {
  return neighbours(this.x, this.y).map(function(arr) {
    return new Cell(arr[0], arr[1]);
  });
};

module.exports = Cell;