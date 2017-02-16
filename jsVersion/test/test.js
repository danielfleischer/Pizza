const evolution = require('../index.js')
const jf = require('jsonfile')
const fs = require('fs')
const path = require('path')
const resultsdir = path.join(__dirname, './results/')
const inputFolder = path.join(__dirname, './inputs')

let config = {
  CREATIONRETRY: 30,
  POPULATIONSIZE: 100,
  MUTATIONRETRY: 100,
  GENERATIONS: 50,
  MUTATIONRATE: 5,
  verbose: false
}
if (!fs.existsSync(resultsdir)) fs.mkdirSync(resultsdir)

describe('testing on google samples', function () {
  this.timeout(0)
  it('should end', function (done) {
    fs.readdir(inputFolder, function (err, files) {
      if (err) throw err
      files.forEach(function (file) {
        let filePath = path.join(inputFolder, file)
        let resultsFileName = path.join(resultsdir, file.split('.')[0] + '-' + (new Date()).getTime() + '.json')
        // config.CREATIONRETRY = file === 'medium' ? 5 : 30
        // config.POPULATIONSIZE = file === 'medium' ? 49 : 100
        console.time('evolution')
        let results = evolution(filePath, config)
        console.timeEnd('evolution')
        jf.writeFileSync(resultsFileName, results)
        console.log('Finished with file', file)
      })
      done()
    })
  })
})
