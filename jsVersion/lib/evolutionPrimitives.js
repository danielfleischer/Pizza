const shuffle = require('shuffle-array')
const mutils = require('./mutils.js')
const _ = require('lodash')

module.exports = (matrix, L, H) => {
  let isSlicesValid = (slices) => mutils.isSlicesValid(slices, matrix, L, H)

  let createInstance = (tries) =>
    Array(tries).fill(0).reduce((r) => {
      let [x1, y1] = [[0, matrix[0].length - 2], [0, matrix.length - 2]].map(mutils.getRandomInt)
      let [x2, y2] = [[x1 + 1, matrix[0].length - 1], [y1 + 1, matrix.length - 1]].map(mutils.getRandomInt)
      return isSlicesValid(r.concat([[[x1, y1], [x2, y2]]])) ? r.concat([[[x1, y1], [x2, y2]]]) : r
    }, [])

  let mate = (s1, s2) =>
    shuffle(s1.concat(s2)).reduce((r, s) => isSlicesValid(r.concat([s])) ? r.concat([s]) : r, [])

  let mutate = (slices, tries) => {
    for (let i = 0; i < tries; i++) {
      let mutatedSlices = _.cloneDeep(slices)
      let [cord, param, changeUp] = [[0, 1], [0, 1], [0, 1]].map(mutils.getRandomInt)
      let slice = mutils.getRandomInt([0, slices.length - 1])
      if (changeUp) {
        if ((param && mutatedSlices[slice][cord][param] < matrix.length - 1) ||
            (!param && mutatedSlices[slice][cord][param] < matrix[0].length - 1)) {
          mutatedSlices[slice][cord][param] += 1
        }
      } else if (!changeUp && mutatedSlices[slice][cord][param] > 0) {
        mutatedSlices[slice][cord][param] -= 1
      }
      if (isSlicesValid(mutatedSlices)) return mutatedSlices
    }
  }

  let fit = (population) => population
    .map(child => ({ solution: child, fitness: mutils.singleFit(child) }))
    .sort((a, b) => {
      let fitA = parseInt(a.fitness)
      let fitB = parseInt(b.fitness)
      if (fitA < fitB) return 1
      if (fitA > fitB) return -1
      return 0
    })

  return { createInstance, fit, mate, mutate }
}
