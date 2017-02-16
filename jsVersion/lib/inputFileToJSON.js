const fs = require('fs')

module.exports = (filename) => {
  let inputFile = fs.readFileSync(filename, 'utf8')
  let lines = inputFile.split('\n')
  let [maxY, maxX, L, H] = lines.shift().split(' ')
  let matrix = lines.map(line => line.split('').map(char => char === 'M' ? 1 : -1).slice(0, maxX)).slice(0, maxY)
  return {maxY, maxX, L, H, matrix}
}
