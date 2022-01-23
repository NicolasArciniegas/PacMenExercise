let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x
  newimg.style.top = position.y
  // TODO add new Child image to game
  game.appendChild(newimg);
  let direction = 'derecha';
  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction
  };
}

function update(llamadas) {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    console.log(item.newimg.src)
    if (item.direction == 'derecha' && llamadas == 6) {
        if (item.newimg.src.includes('1')) {
            item.newimg.src = item.newimg.src.replace('1', '2');
        }
        else {
            item.newimg.src = item.newimg.src.replace('2', '1');
        }
        llamadas = 0;
    }
    else if (llamadas == 6) {
        if (item.newimg.src.includes('3')) {
            item.newimg.src = item.newimg.src.replace('3', '4');
        }
        else {
            item.newimg.src = item.newimg.src.replace('4', '3');
        }
        llamadas = 0;
    }

    llamadas ++;

  });
  setTimeout(
      () => {
          update(llamadas)
      },
      20
  );
}

function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newimg.width 
    > window.innerWidth || item.position.x + item.velocity.x < 0) {
      item.velocity.x = - item.velocity.x
      item.direction = 'izquierda';
      item.newimg.src = './images/PacMan3.png'
    }
  if (item.position.y + item.velocity.y + item.newimg.height 
    > window.innerHeight || item.position.y + item.velocity.y < 0) {
      item.velocity.y = - item.velocity.y
    }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
