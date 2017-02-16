const evolutionPrimitives = require('./evolutionPrimitives.js')
const mutils = require('./mutils.js')

module.exports = ({
  CREATIONRETRY = 30,
  POPULATIONSIZE = 100,
  MUTATIONRETRY = 100,
  GENERATIONS = 50,
  MUTATIONRATE = 5,
  L, H, matrix
}) => {
  let results = { initialPopulation: [], generations: [] }
  let primitives = evolutionPrimitives(matrix, L, H)
  let maxFitness = matrix.length * matrix[0].length
  let population = []

  for (let i = 0; i < POPULATIONSIZE; i++) {
    let child = primitives.createInstance(CREATIONRETRY)
    population.push(child)
  }

  results.initialPopulation.push(primitives.fit(population))

  for (let i = 0; i < GENERATIONS; i++) {
    let testPopulation = primitives.fit(population)
    results.generations.push({ generation: i, population: testPopulation })
    let fittestChildren = testPopulation.slice(0, 10)
    let fittest = fittestChildren[0]

    if (fittest.fitness === maxFitness) break
    population = []

    for (let j = 0; j < Math.sqrt(POPULATIONSIZE); j++) {
      for (let k = 0; k < Math.sqrt(POPULATIONSIZE); k++) {
        population.push(primitives.mate(fittestChildren[j].solution, fittestChildren[k].solution))
      }
    }

    population = population
      .map(child =>
        mutils.getRandomInt([1, 100]) < MUTATIONRATE ? primitives.mutate(child, MUTATIONRETRY) : child)
  }
  let finalState = primitives.fit(population)
  results.finalState = finalState
  results.fittest = finalState[0]

  return results
}
