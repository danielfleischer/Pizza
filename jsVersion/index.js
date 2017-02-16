const evolution = require('./lib/evolution')
const inputFileToJSON = require('./lib/inputFileToJSON')

module.exports = (filename, config) => {
  let data = inputFileToJSON(filename)
  Object.assign(data, process.env, config)
  return Object.assign(data, evolution(data))
}
