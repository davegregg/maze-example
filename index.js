{

  const log = console.log

  const map =
`▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 ▓░░░▓░░░░░▓░░░░░▓░▓░▓
 ▓░▓░▓░▓▓▓░▓▓▓▓▓░▓░▓░▓
 ▓░▓░▓░░░▓░░░░░▓░▓░░░▓
 ▓░▓▓▓▓▓▓▓░▓░▓▓▓░▓░▓░▓
 ▓░░░░░░░░░▓░░░░░▓░▓░▓
 ▓░▓▓▓░▓▓▓▓▓░▓▓▓▓▓░▓░▓
 ▓░▓░░░▓░░░▓░▓░░░░░▓░▓
 ▓░▓▓▓▓▓░▓░▓░▓░▓▓▓░▓░F
 S░░░░░▓░▓░▓░▓░▓░▓░▓▓▓
 ▓▓▓▓▓░▓░▓░▓░▓░▓░▓░▓░▓
 ▓░░░░░▓░▓░▓░░░▓░▓░▓░▓
 ▓░▓▓▓▓▓▓▓░▓▓▓▓▓░▓░▓░▓
 ▓░░░░░░░▓░░░░░░░▓░░░▓
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`

  const tokens = {
    delimeter:  "\n " ,
    wall:       "▓"   ,
    space:      "░"   ,
    start:      "S"   ,
    finish:     "F"   ,
  }

  const mazeContainer = document.getElementById("maze")

  function findPropertyNameByValue(object, value) {
    for (let name of Object.getOwnPropertyNames(object))
      if (object[name] === value)
        var property = String(name)

    return property || null
  }

  function makeRow(rowAsString, rowIndex) {
    const rowDiv = document.createElement("div")
    rowDiv.dataset.index = rowIndex
    rowDiv.classList.add("row")

    const row = [...rowAsString]
    row.forEach(makeCell(rowDiv))

    mazeContainer.appendChild(rowDiv)
  }

  function makeCell(rowDiv) {
    callBackWithForEachCallback:
    return (cellToken, cellIndex) => {
      const type = findPropertyNameByValue(tokens, cellToken)

      const cellDiv = document.createElement("div")
      cellDiv.dataset.index = cellIndex
      cellDiv.dataset.type = type
      cellDiv.classList.add("cell", type)

      rowDiv.appendChild(cellDiv)
    }
  }

  function keyHandler(event) {
    const [key, arrow] = event.key.match(/Arrow(\w+)/) || [false]
    if (arrow) move[arrow.toLowerCase()]()
  }

  const move = {

    left: () => { 
        log("left")
    },

    right: () => {
      log("right")
    },
    
    down: () => {
      log("down")
    },
    
    up: () => {
      log("up")
    },
    
  }

  function loadGame() {

    map
      .split(tokens.delimeter)
      .forEach(makeRow)
    
    document.addEventListener("keydown", keyHandler)
    
    log(mazeContainer.childNodes)
    
  }

  loadGame()

  // TODO: place player cell
  // TODO: write move.${direction} methods

}