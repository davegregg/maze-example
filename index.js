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

  function makeCellTotemCallback(rowDiv) {
    return (cellAsToken, iCell) => {
      const type = findPropertyNameByValue(tokens, cellAsToken)
      
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

  function moveHorizontally(arrow) {
    if (arrow === "ArrowLeft") {

    } else if (arrow === "ArrowRight") {
      
    }
  }
  function moveVertically(arrow) {
    if (arrow === "ArrowDown") {

    } else if (arrow === "ArrowUp") {

    }
  }

  function keyHandler({ key }) {
    const [ arrow ] = key.match(/Arrow\w+/) || [ false ]
    log(arrow)

    const isHorizontal = arrow === "ArrowLeft" || arrow === "ArrowRight"
    const isVertical = arrow === "ArrowDown" || arrow === "ArrowUp"

    if (isHorizontal) moveHorizontally(arrow)
    if (isVertical) moveVertically(arrow)
  }

  const maze = 
    map
      .split(tokens.delimeter)
      .map(makeRowTotem)

  log(mazeContainer.childNodes)
  document.addEventListener("keydown", keyHandler)

}