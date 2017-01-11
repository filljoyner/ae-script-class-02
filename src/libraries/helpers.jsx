/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {float} a random floating point number
 */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}


/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {int} a random integer
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function foreach(arrayOfItems, func) {
    var _foreachLoop;

    for(_foreachLoop = 0; _foreachLoop < arrayOfItems.length; _foreachLoop++) {
        func(arrayOfItems[_foreachLoop], _foreachLoop);
    }
}
