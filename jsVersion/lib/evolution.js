const evolutionPrimitives = require('./evolutionPrimitives.js')
const mutils = require('./mutils.js')

module.exports = ({
  CREATIONRETRY = 30,
  POPULATIONSIZE = 100,
  MUTATIONRETRY = 100,
  GENERATIONS = 50,
  MUTATIONRATE = 5,
  L, H, matrix, verbose
}) => {
  let results = { generations: [] }
  let primitives = evolutionPrimitives(matrix, L, H)
  let maxFitness = matrix.length * matrix[0].length
  let population = []

  for (let i = 0; i < POPULATIONSIZE; i++) {
    let child = primitives.createInstance(CREATIONRETRY)
    population.push(child)
  }

  if (verbose) results.initialPopulation = primitives.fit(population)

  for (let i = 0; i < GENERATIONS; i++) {
    let generation = { generation: i }
    let currentPopulation = primitives.fit(population)
    verbose && Object.assign(generation, { population: currentPopulation })
    let fittestChildren = currentPopulation.slice(0, 10)
    let fittest = fittestChildren[0]
    generation.fittest = fittest

    results.generations.push(generation)

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
  let lastPopulation = primitives.fit(population)
  if (verbose) results.lastPopulation = lastPopulation
  results.fittest = lastPopulation[0]

  return results
}
