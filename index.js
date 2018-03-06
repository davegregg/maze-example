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

  const character = {
    linebreak:  "\n " ,
    wall:       "▓"   ,
    space:      "░"   ,
    start:      "S"   ,
    finish:     "F"   ,
  }

  const mazeContainer = document.getElementById("maze")

  function findPropertyNameByValue(object, value) {
    for (let name of Object.getOwnPropertyNames(object))
      if (character[name] === value)
        var property = String(name)

    return property || null
  }

  function makeCellTotemCallback(rowDiv) {
    return (cell, iCell) => {
      const type = findPropertyNameByValue(character, cell)
      
      const cellDiv = document.createElement("div")
      cellDiv.dataset.index = iCell
      cellDiv.classList.add("cell", type)

      rowDiv.appendChild(cellDiv)

      const cellTotem = [ cellDiv, type ]
      return cellTotem
    }
  }

  function makeRowTotem(rowAsString, iRow) {
    const rowDiv = document.createElement("div")
    rowDiv.dataset.index = iRow
    rowDiv.classList.add("row")

    mazeContainer.appendChild(rowDiv)

    const row = [...rowAsString].map(
      makeCellTotemCallback(rowDiv)
    )

    const rowTotem = [ rowDiv, row ]
    return rowTotem
  }

  const maze = 
    map
      .split(character.linebreak)
      .map(makeRowTotem)

  log(maze)

}