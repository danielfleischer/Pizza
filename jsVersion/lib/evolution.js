const evolutionPrimitives = require('./evolutionPrimitives.js')
const mutils = require('./mutils.js')

module.exports = ({
  CREATIONRETRY = 30,
  POPULATIONSIZE = 100,
  MUTATIONRETRY = 100,
  GENERATIONS = 50,
  MUTATIONRATE = 5,
  DRIFT = 5,
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
    let topPopulationSize = Math.sqrt(POPULATIONSIZE)
    verbose && Object.assign(generation, { population: currentPopulation })
    let fittestChildren = currentPopulation.slice(0, topPopulationSize)
    let fittest = fittestChildren[0]
    generation.fittest = fittest

    results.generations.push(generation)

    if (fittest.fitness === maxFitness) break
    population = []

    for (let j = 0; j < fittestChildren.length; j++) {
      for (let k = 0; k < fittestChildren.length; k++) {
        let child = primitives.mate(fittestChildren[j].solution, fittestChildren[k].solution, DRIFT)
        population.push(child)
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
