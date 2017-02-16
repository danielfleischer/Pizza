const evolution = require('../index.js')
const jf = require('jsonfile')
const fs = require('fs')
const path = require('path')
const resultsdir = path.join(__dirname, './results/')
const inputFolder = path.join(__dirname, './inputs')
const inputFileToJSON = require(path.join(__dirname, './../lib/inputFileToJSON'))

let config = Object.assign({RUNS: 1}, process.env)

if (!fs.existsSync(resultsdir)) fs.mkdirSync(resultsdir)

describe('testing on google samples', function () {
  this.timeout(0)
  it('should end', function (done) {
    let poolSizeBash = config.POOLSIZEBASE
    fs.readdir(inputFolder, function (err, files) {
      if (err) throw err
      for (let i = 0; i < config.RUNS; i++) {
        files.forEach(function (file) {
          let filePath = path.join(inputFolder, file)
          let resultsFileName = path.join(resultsdir, file.split('.')[0] + '-' + (new Date()).getTime() + '.json')
          config.POPULATIONSIZE = Math.pow(poolSizeBash, 2)
          let data = inputFileToJSON(filePath)
          config.CREATIONRETRY = Math.max(poolSizeBash * 5, data.maxY, data.maxX, 30)
          console.time('evolution')
          let results = evolution(filePath, config)
          console.timeEnd('evolution')
          jf.writeFileSync(resultsFileName, results)
          console.log('Finished with file', file)
        })
        poolSizeBash++
      }
      done()
    })
  })
})
