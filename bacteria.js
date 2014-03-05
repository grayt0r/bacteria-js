var readline = require('readline');

var Dish = require('./dish');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var input = [];

rl.write('Please enter the location of the live cells\n');
rl.prompt();

rl.on('line', function (location) {
  var split = location.split(',').map(function(el) {
    return parseInt(el, 10);
  });
  
  if(split[0] === -1 && split[1] === -1) {
    rl.close();
    new Dish(input);
  } else {
    input.push(split);
    rl.prompt();
  }
});