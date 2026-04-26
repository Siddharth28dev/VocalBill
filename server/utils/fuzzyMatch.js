function similarity(a, b) {

  a = a.toLowerCase()
  b = b.toLowerCase()

  let longer = a.length > b.length ? a : b
  let shorter = a.length > b.length ? b : a

  let same = 0

  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) same++
  }

  return same / longer.length
}

module.exports = similarity