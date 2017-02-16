const _ = require('lodash')

let getRandomInt = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min

let area = (x1, y1, x2, y2) => Math.abs((x2 - x1 + 1) * (y2 - y1 + 1))

let flattenMatrix = ({matrix, x1, y1, x2, y2}) =>
  _(matrix)
    .filter((row, index) => index >= y1 && index <= y2)
    .map(row => row.filter((col, index) => index >= x1 && index <= x2))
    .flatten().value()

let isOverlap = (part) => flattenMatrix(part).filter(item => !item).length > 0

let sumArea = (part) => flattenMatrix(part).reduce((a, b) => a + b, 0)

let insertSliceToMatrix = (matrix, x1, y1, x2, y2) => {
  for (let i = y1; i <= y2; i++) {
    for (let j = x1; j <= x2; j++) matrix[i][j] = 0
  }
  return matrix
}

// //////////////////////////////////////////////////////////////////////////
// Prettier way to do it but so much slower that it's not worth it :) ///////
// //////////////////////////////////////////////////////////////////////////
// let insertSliceToMatrix = (matrix, x1, y1, x2, y2) => {                 //
//   matrix.map((row, index) =>                                            //
//     checkBounds(index, y1, y2) && row.map((col, index) =>               //
//       checkBounds(index, x1, x2) ? 0 : 1))                              //
// //////////////////////////////////////////////////////////////////////////

let isSlicesValid = (slices, matrix, L, H) => {
  let coverMatrix = _.cloneDeep(matrix)
  for (let i = 0; i < slices.length; i++) {
    let [[x1, y1], [x2, y2]] = slices[i]
    let sliceArea = area(x1, y1, x2, y2)
    if (sliceArea > H) return false
    let areaSum = sumArea({matrix, x1, y1, x2, y2})
    if (areaSum < L - sliceArea || areaSum > sliceArea - L) return false
    if (isOverlap({matrix: coverMatrix, x1, y1, x2, y2})) return false
    coverMatrix = insertSliceToMatrix(coverMatrix, x1, y1, x2, y2)
  }
  return true
}

module.exports = { area, getRandomInt, isOverlap, isSlicesValid }

