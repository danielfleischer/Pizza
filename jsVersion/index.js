const evolution = require('./lib/evolution.js')

let matrix =
  [
    [1, 1, 1, -1, 1, -1, 1],
    [1, 1, -1, 1, 1, -1, 1],
    [1, 1, 1, 1, -1, 1, 1],
    [1, 1, 1, 1, -1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [-1, -1, -1, -1, -1, -1, -1],
    [1, -1, 1, -1, 1, -1, 1],
    [1, -1, 1, -1, 1, -1, 1]
  ]
let [L, H] = [4, 15]

evolution({
  CREATIONRETRY: 30,
  POPULATIONSIZE: 100,
  MUTATIONRETRY: 100,
  GENERATIONS: 50,
  MUTATIONRATE: 5,
  L,
  H,
  matrix
})
