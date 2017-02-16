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
  let results = { generations: [], fittest: { fitness: 0 } }
  let primitives = evolutionPrimitives(matrix, L, H)
  let maxFitness = matrix.length * matrix[0].length
  let population = []
  console.time('Creating Population')
  for (let i = 0; i < POPULATIONSIZE; i++) {
    console.time('Creating Child number', i + 1)
    let child = primitives.createInstance(CREATIONRETRY)
    population.push(child)
    console.timeEnd('Creating Child number', i + 1)
  }
  console.timeEnd('Creating Population')
  if (verbose) results.initialPopulation = primitives.fit(population)

  for (let i = 0; i < GENERATIONS; i++) {
    console.time('End of Generation Number: ' + (i + 1))
    let generation = { generation: i }

    console.time('1. Select Fittest')
    let currentPopulation = primitives.fit(population)
    let topPopulationSize = Math.sqrt(POPULATIONSIZE)
    verbose && Object.assign(generation, { population: currentPopulation })
    let fittestChildren = currentPopulation.slice(0, topPopulationSize)
    generation.fittest = fittestChildren[0]
    if (generation.fittest.fitness > results.fittest.fitness) {
      results.fittest = generation.fittest
    }
    console.timeEnd('1. Select Fittest')
    console.log('Best fitnest for This Generation:', generation.fittest.fitness)
    console.log('Solution:', generation.fittest.solution)

    results.generations.push(generation)

    if (generation.fittest.fitness === maxFitness) break
    population = []

    console.time('2. Mate')
    for (let j = 0; j < fittestChildren.length; j++) {
      for (let k = 0; k < fittestChildren.length; k++) {
        let child = primitives.mate(fittestChildren[j].solution, fittestChildren[k].solution, DRIFT)
        population.push(child)
      }
    }
    console.timeEnd('2. Mate')

    console.time('3. Mutate')
    population = population
      .map(child => mutils.getRandomInt([1, 100]) < MUTATIONRATE ? primitives.mutate(child, MUTATIONRETRY) : child)
    console.timeEnd('3. Mutate')

    console.timeEnd('End of Generation Number: ' + (i + 1))
    console.log('Best Fittnest so far:', results.fittest.fitness)
  }

  let lastPopulation = primitives.fit(population)
  if (verbose) results.lastPopulation = lastPopulation
  if (lastPopulation[0].fitness > results.fittest.fitness) {
    results.fittest = lastPopulation[0]
  }
  return results
}
