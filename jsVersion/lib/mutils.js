let getRandomInt = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min

let area = (x1, y1, x2, y2) => Math.abs((x2 - x1 + 1) * (y2 - y1 + 1))

let singleFit = (S) => S.reduce((r, s) => r + area(s[0][0], s[0][1], s[1][0], s[1][1]), 0)

let isOverLap = (verifiedSlices, lx1, ly1, rx1, ry1) => {
  if (!verifiedSlices.length) return false
  for (let i = 0, len = verifiedSlices.length; i < len; i++) {
    let slice = verifiedSlices[i]
    if (!(lx1 > slice[1][0] || slice[0][0] > rx1)) return true
    if (!(ly1 < slice[1][1] || slice[0][1] < ry1)) return true
  }
  return false
}

let sumArea = ({matrix, x1, y1, x2, y2}) => {
  let result = 0
  for (let i = y1; i <= y2; i++) {
    for (let j = x1; j <= x2; j++) result += matrix[i][j]
  }
  return result
}

let isSlicesValid = (slices, matrix, L, H) => {
  let verifiedSlices = []
  for (let i = 0; i < slices.length; i++) {
    let [[x1, y1], [x2, y2]] = slices[i]
    let sliceArea = area(x1, y1, x2, y2)
    if (sliceArea > H) return false
    let areaSum = sumArea({matrix, x1, y1, x2, y2})
    if (areaSum < L - sliceArea || areaSum > sliceArea - L) return false
    if (isOverLap(verifiedSlices, x1, y1, x2, y2)) return false
    verifiedSlices.push([[x1, y1], [x2, y2]])
  }
  return true
}

module.exports = { area, getRandomInt, isSlicesValid, singleFit }

