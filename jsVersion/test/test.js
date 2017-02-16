const evolution = require('../index.js')
const jf = require('jsonfile')
const fs = require('fs')
const path = require('path')
const resultsdir = path.join(__dirname, './results/')
const inputFolder = path.join(__dirname, './inputs')

let config = Object.assign({RUNS: 1}, process.env)

if (!fs.existsSync(resultsdir)) fs.mkdirSync(resultsdir)

describe('testing on google samples', function () {
  this.timeout(0)
  it('should end', function (done) {
    let poolSizeBash = config.POOLSIZEBASE
    fs.readdir(inputFolder, function (err, files) {
      if (err) throw err
      for (let i = 0; i < config.RUNS; i++) {
        files.filter(file => file.split('.')[1] === 'in').forEach(function (file) {
          let filePath = path.join(inputFolder, file)
          let resultsFileName = path.join(resultsdir, file.split('.')[0] + '-' + (new Date()).getTime() + '.json')
          config.POPULATIONSIZE = Math.pow(poolSizeBash, 2)
          config.CREATIONRETRY = 2500
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
