const shuffle = require('shuffle-array')
const mutils = require('./mutils.js')

module.exports = (matrix, L, H) => {
  let isSlicesValid = (slices) => mutils.isSlicesValid(slices, matrix, L, H)

  let createInstance = (tries) => {
    let instance = []
    for (let i = 0; i < tries || instance.length < 1; i++) {
      let x1 = mutils.getRandomInt([0, matrix[0].length - 2])
      let y1 = mutils.getRandomInt([0, matrix.length - 2])
      let x2 = mutils.getRandomInt([x1 + 1, matrix[0].length - 1])
      let y2 = mutils.getRandomInt([y1 + 1, matrix.length - 1])
      instance.push([[x1, y1], [x2, y2]])
      let isValid = !isSlicesValid(instance)
      if (!isValid) instance.pop()
    }
    return instance
  }

  let mate = (s1, s2, drift) => {
    let leftGene = s1.slice(0, Math.ceil(s1.length / 2))
    let rightGene = s2.slice(Math.floor(s2.length / 2))
    let mixedChild = shuffle(leftGene.concat(rightGene))

    if (mutils.getRandomInt([1, 100]) < drift) {
      if (mutils.getRandomInt([0, 1])) {
        mixedChild.push(s1[mutils.getRandomInt([Math.floor(s1.length / 2), s1.length - 1])])
      } else {
        mixedChild.push(s2[mutils.getRandomInt([0, Math.ceil(s2.length / 2)])])
      }
    }

    let result = []
    for (let i = 0; i < mixedChild.length; i++) {
      result.push(mixedChild[i])
      let isValid = isSlicesValid(result)
      if (!isValid) result.pop()
    }
    return result
  }

  let mutate = (slices, tries) => {
    for (let i = 0; i < tries; i++) {
      let cord = mutils.getRandomInt([0, 1])
      let param = mutils.getRandomInt([0, 1])
      let amountToChange = mutils.getRandomInt([0, 1]) ? 1 : -1
      let slice = mutils.getRandomInt([0, slices.length - 1])
      if (~amountToChange) {
        if ((param && slices[slice][cord][param] < matrix.length - 1) ||
            (!param && slices[slice][cord][param] < matrix[0].length - 1)) {
          slices[slice][cord][param] += amountToChange
        }
      } else if (!~amountToChange && slices[slice][cord][param] > 0) {
        slices[slice][cord][param] += amountToChange
      }
      if (isSlicesValid(slices)) return slices
      else {
        slices[slice][cord][param] -= amountToChange
      }
    } return slices
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
