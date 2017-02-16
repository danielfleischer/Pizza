const evolutionPrimitives = require('./evolutionPrimitives.js')
const mutils = require('./mutils.js')

module.exports = ({
  CREATIONRETRY = 30,
  POPULATIONSIZE = 100,
  MUTATIONRETRY = 100,
  GENERATIONS = 50,
  MUTATIONRATE = 5,
  L,
  H,
  matrix
}) => {
  let primitives = evolutionPrimitives(matrix, L, H)

  let printChild = (step, child, num) => {
    console.log(step, 'child -', num, '-', child)
    console.log(step, 'fit -', primitives.fit(child))
  }

  console.log('matrix', matrix)

  let population = []

  for (let i = 0; i < POPULATIONSIZE; i++) {
    let child = primitives.createInstance(CREATIONRETRY)
    printChild('new child -', child, i)
    population.push(child)
  }

  for (let i = 0; i < GENERATIONS; i++) {
    let fittestChildren = primitives.fit(population).slice(0, 10)
    let fittest = fittestChildren[0]
    console.log('Fittest for Generation:', i)
    console.log(fittest.solution)
    console.log('Fitness:', fittest.fitness)
    console.log('---------------------------')

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

  console.log('-------- End state of population -------')
  primitives.fit(population).forEach(child => console.log('solution', child.solution, 'fitness', child.fitness))
}
