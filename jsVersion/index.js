const evolution = require('./lib/evolution')
const inputFileToJSON = require('./lib/inputFileToJSON')

module.exports = (filename, config) => {
  let data = inputFileToJSON(filename)
  Object.assign(data, {
    CREATIONRETRY: 30,
    POPULATIONSIZE: 100,
    MUTATIONRETRY: 100,
    GENERATIONS: 50,
    MUTATIONRATE: 5
  }, config)
  return Object.assign(data, evolution(data))
}
