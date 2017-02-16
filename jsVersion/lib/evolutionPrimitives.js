const shuffle = require('shuffle-array')
const mutils = require('./mutils.js')

module.exports = (matrix, L, H) => {
  let isSlicesValid = (slices) => mutils.isSlicesValid(slices, matrix, L, H)

  let createInstance = (tries) => {
    let instance = []
    for (let i = 0; i < tries; i++) {
      let x1 = mutils.getRandomInt([0, matrix[0].length - 2])
      let y1 = mutils.getRandomInt([0, matrix.length - 2])
      let x2 = mutils.getRandomInt([x1 + 1, matrix[0].length - 1])
      let y2 = mutils.getRandomInt([y1 + 1, matrix.length - 1])
      if (isSlicesValid(instance.concat([[[x1, y1], [x2, y2]]]))) {
        instance = instance.concat([[[x1, y1], [x2, y2]]])
      }
    }
    return instance
  }

  let mate = (s1, s2) =>
    shuffle(s1.concat(s2)).reduce((r, s) => isSlicesValid(r.concat([s])) ? r.concat([s]) : r, [])

  let mutate = (slices, tries) => {
    for (let i = 0; i < tries; i++) {
      let cord = mutils.getRandomInt([0, 1])
      let param = mutils.getRandomInt([0, 1])
      let changeUp = mutils.getRandomInt([0, 1])
      let amountToChange = changeUp ? 1 : -1
      let slice = mutils.getRandomInt([0, slices.length - 1])
      if (changeUp) {
        if ((param && slices[slice][cord][param] < matrix.length - 1) ||
            (!param && slices[slice][cord][param] < matrix[0].length - 1)) {
          slices[slice][cord][param] += amountToChange
        }
      } else if (!changeUp && slices[slice][cord][param] > 0) {
        slices[slice][cord][param] += amountToChange
      }
      if (isSlicesValid(slices)) return slices
      else {
        slices[slice][cord][param] -= amountToChange
      }
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
