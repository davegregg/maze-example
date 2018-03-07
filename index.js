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

  const mapContainer = document.getElementById( "maze" )

  function findPropertyNameByValue( object, value ) {
    for ( let name of Object.getOwnPropertyNames( object ) )
      if ( object[ name ] === value )
        var property = String( name )

    return property || null
  }

  const make = {

    map: () => {
      map
        .split( tokens.delimeter )
        .forEach( make.row )
    },

    row: ( rowAsString, rowIndex ) => {
      const rowDiv = document.createElement( "div" )
      rowDiv.dataset.index = rowIndex
      rowDiv.classList.add( "row" )
  
      const row = [ ...rowAsString ]
      row.forEach( make.cell( rowDiv ) )
  
      mapContainer.appendChild( rowDiv )
    },

    cell: ( rowDiv ) => {
      callBackWithForEachCallback:
      return ( cellToken, cellIndex ) => {
        const type = findPropertyNameByValue( tokens, cellToken )
  
        const cellDiv = document.createElement( "div" )
        cellDiv.dataset.index = cellIndex
        cellDiv.dataset.type = type
        cellDiv.classList.add( "cell", type )
  
        rowDiv.appendChild( cellDiv )
      }
    },

    player: () => {
      const playerDiv = document.createElement( "div" )
      playerDiv.id = "player"
      playerDiv.classList.add( "cell" )

      const start = document.querySelector(`div.row div.cell[data='${ tokens.start }']`)
      start.appendChild(playerDiv)
    },

  }

  function keyHandler( event ) {
    const [ key, arrow ] = event.key.match( /Arrow(\w+)/ ) || []            // [ "ArrowDown", "Down" ]
    if ( !arrow ) return null
    
    const direction = arrow.toLowerCase()                                   // "down"
    if (check[ direction ]())
      move[ direction ]()
  }

  const deltas = {
    left:  [ 0, -1 ],
    right: [ 0, +1 ],
    down:  [ +1, 0 ],
    up:    [ -1, 0 ],
  }

  const check = {

    left: ( deltas = deltas ) => {
      return true
    },
    
    right: ( deltas = deltas ) => {
      return true
    },
    
    down: ( deltas = deltas ) => {
      return true
    },
    
    up: ( deltas = deltas ) => {
      return true
    },
    
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
    document.addEventListener( "keydown", keyHandler )
    make.map()
    
    log( mapContainer.childNodes )
  }

  loadGame()

  // TODO: place player cell
  // TODO: write move.${direction} methods

}