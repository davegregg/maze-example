{

  const log = ( ...args ) => {
    console.log( ...args )
    return args[ args.length - 1 ]
  }

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
  
  const mapContainer = document.getElementById( "container" )
  let player = null


  function findPropertyNameByValue( object, value ) {
    for ( let name of Object.getOwnPropertyNames( object ) )
      if ( object[ name ] === value )
        var property = String( name )

    return property || null
  }


  const offsetCoords = {
    left: ( offset = 1 ) => [ 0, -offset ],
    right: ( offset = 1 ) => [ 0, +offset ],
    down: ( offset = 1 ) => [ +offset, 0 ],
    up: ( offset = 1 ) => [ -offset, 0 ],
  }


  const check = {

    next: offset => {
      const nextCell = getNextCell( offset )
      const nextIsWall = nextCell ? ( nextCell.dataset.type === "wall" ) : true
      const nextIsClear = !nextIsWall

      return nextIsClear
    },

    left: () => log( "check left: ", check.next( offsetCoords.left ) ),
    right: () => log( "check right: ", check.next( offsetCoords.right ) ),
    down: () => log( "check down: ", check.next( offsetCoords.down ) ),
    up: () => log( "check up: ", check.next( offsetCoords.up ) ),
    
  }


  const move = {

    next: offset => {
      const nextCell = getNextCell( offset )
      player.parentElement.removeChild( player )
      setPlayerCoordinates( nextCell.dataset.row, nextCell.dataset.index )
      return Boolean( nextCell.appendChild( player ) )
    },

    left: async () => move.next( offsetCoords.left ),
    right: async () => move.next( offsetCoords.right ),
    down: async () => move.next( offsetCoords.down ),
    up: async () => move.next( offsetCoords.up ),
    
  }


  const make = {

    map: async function () {
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

    cell: function ( rowDiv ) {

      callBackWithForEachCallback:
      return function ( cellToken, cellIndex ) {
        const type = findPropertyNameByValue( tokens, cellToken )
  
        const cellDiv = document.createElement( "div" )
        cellDiv.dataset.row = rowDiv.dataset.index
        cellDiv.dataset.index = cellIndex
        cellDiv.dataset.type = type
        cellDiv.classList.add( "cell", type )
        
        rowDiv.appendChild( cellDiv )
      }
    },

    player: () => {
      player = document.createElement( "div" )
      player.id = "player"
      player.classList.add( "cell" )

      const movePlayerToStart = startingCell => {
        setPlayerCoordinates( startingCell.dataset.row, startingCell.dataset.index )
        startingCell.appendChild( player )
        return player
      }
      
      return findCell({ type: "start" })
        .then( movePlayerToStart )
    },
  }


  function findCellByCoordinates ([ rowCoord, cellCoord ]) {
    const beyondLeftOrTop = rowCoord < 0 || cellCoord < 0
    const beyondRightOrBottom = 
      rowCoord > mapContainer.childNodes.length || 
      cellCoord > mapContainer.childNodes[ 0 ].childNodes.length

    if ( beyondLeftOrTop || beyondRightOrBottom ) return null

    return mapContainer
      .childNodes[ rowCoord ]
      .childNodes[ cellCoord ]
  }


  async function findCell ({ type, token }) {
    const cellType = type ? type : findPropertyNameByValue( tokens, token )
    return mapContainer.querySelector( `.cell[data-type='${ cellType }']` )
  }


  function calculateNewCoordinates ([ row, cellCoord ], [ rowOffset, cellOffset ]) {
    return [ row + rowOffset, cellCoord + cellOffset ]
  }


  function getNextCell( getOffset ) {
      const currentCoords = getPlayerCoordinates()
      const nextCoords = calculateNewCoordinates( currentCoords, getOffset() )
      return findCellByCoordinates( nextCoords )
  }


  function setPlayerCoordinates( row, cell ) {
    return [ player.dataset.row = row, player.dataset.cell = cell ]
  }


  function getPlayerCoordinates() {
    return [ Number( player.dataset.row ), Number( player.dataset.cell ) ]
  }


  function checkWin() {
    const [ playerRow, playerCell ] = getPlayerCoordinates()

    return findCell({ type: "finish" })
      .then(({ finishingCellData }) => {
        return (
          finishingCellData.row == playerRow 
            && finishingCellData.index == playerCell
        )
      })
  }


  function keyHandler( event ) {
    // const [ key, arrow ] = event.key.match( /Arrow(\w+)/ ) || []            // [ "ArrowDown", "Down" ]
    const arrow = event.key.beginsWith( "Arrow" ) && event.key.split( "Arrow" )[ 1 ]
    if ( !arrow ) return null
    
    const direction = arrow.toLowerCase()                                   // "down"
    if ( check[ direction ]() )
      move[ direction ]()
        .then( checkWin )
  }

  
  function loadGame() {
    make.map()
      .then(() => {
        findCell({ type: "start" })
          .then( element => startingCell = element )
        findCell({ type: "finish" })
          .then( element => finishingCell = element )
        
        make.player()
      })
    
    document.addEventListener( "keydown", keyHandler )
  }

  loadGame()

}