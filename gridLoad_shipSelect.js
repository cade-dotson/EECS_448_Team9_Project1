
//features to add: ???local two-player games???
var numShipsChoice;
var selectionPhase = true;
var numHits = 0;
var canAttack = false;
var shipOrientation = 0;
var numShips;  
var numPieces;
var hitsToWin = 0;


//main function calls loadgrid and passes the function used by the player for attacking
//also handles the player's choice for number of ships
function main(gameType)
{
    shipNumSelect = document.createElement('select');
    configButtons = document.querySelector('#configButtons');
    numShipsChoice=parseInt(document.querySelector('#chooseNumShips').value);
    for(let i=numShipsChoice; i>0; i--)
    {
        hitsToWin += i;
    }
    numShips=numShipsChoice;
    numPieces=numShips;
    configButtons.remove();
    document.querySelectorAll('.startButton').forEach(
            function(el){el.hidden = false;} );
    if(gameType.id === 'botGame')
    {
        loadGrid(attackBot, shipArr, attackArr);
        document.querySelector('#ready').onclick = botIsReady;
    }
    else if(gameType.id === 'local')
    {
        loadSelectionGrid(p1shipArr);
        document.querySelector('#ready').onclick = localIsReady;
    }
    // else if(gameType.id === 'onlineGame')//for possible game against another player
    // {
    //     loadGrid(attackPlayer);
    // }
    console.log(numShips);
    console.log(numPieces);
}

function loadGrid(attackFunc, playerShipArray, playerAttackArray)
{
    var gameBoard = document.querySelector('#board');
    var shipBoard = document.createElement('table');
    var attackBoard = document.createElement('table');
    var mouseDown = false;
    
    document.addEventListener("mouseup", function(){
        mouseDown = false;
    });

    gameBoard.appendChild(shipBoard);
    gameBoard.appendChild(attackBoard);

    shipBoard.className = 'grid';
    attackBoard.className = 'grid';

    for(i=0; i<10; i++)
    {
        var row = shipBoard.insertRow(i);
        for(j=0; j<10; j++)
        {
            shipBtn = document.createElement('button');
            shipBtn.className = 'unselectedShip';
            shipBtn.addEventListener("mousedown", function(){
                
                if(selectionPhase === true)
                {
                    //console.log("d");
                    placeShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    mouseDown = true;
                }
            });
            shipBtn.addEventListener("mousemove", function(){
                if(selectionPhase === true)
                {
                    if(mouseDown === true && numPieces>0)
                    {
                        placeShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    }
                }
            });
            shipBtn.addEventListener("mouseup", function(){
                if(selectionPhase === true)
                {
                    placeShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    
                    mouseDown = false;
                }
            });
            var cell = row.insertCell(j);
            cell.appendChild(shipBtn);
        }
        
  
        row = attackBoard.insertRow(i);
        for(j=0; j<10; j++)
        {
            var atkBtn = document.createElement('button');
            atkBtn.className = 'attackChoice';
            atkBtn.addEventListener("click", function(){
                if(playerAttackArray[this.parentNode.parentNode.rowIndex][this.parentNode.cellIndex] === 0 && canAttack)
                {
                    this.className = 'pendingAttack';
                    canAttack = false;
                    attackFunc(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this);
                }
            });

            cell = row.insertCell(j);
            cell.appendChild(atkBtn);
        }
    }
}

function resetShipGrid()
{
    console.log('reset button selected');
    document.querySelectorAll('.selectedShip').forEach(function(el){
        el.className = 'unselectedShip';
    });
    selectionPhase = true;
    shipOrientation = 0;
    numShips=numShipsChoice;
    numPieces=numShips;
    for(var i=0; i<10; i++)
    {
        for(var j=0; j<10; j++)
        {
            shipArr[i][j]=0;
        }
    }
}

function placeShipPiece(row, col, el, arr)
{
    if(canPlace(row, col) && numPieces > 0 )
    {
        el.className = 'selectedShip';
        arr[row][col] = numShips;
        numPieces--;
        if(numPieces == 0)
        {
            numShips--;
            numPieces = numShips;
            shipOrientation = 0;
            console.log("ship selection over");
        }
    }
    else if(numPieces == 0 && numShips == 0)
    {
        console.log("selection phase over");
        selectionPhase = false;
    }
}

function canPlace(row, col)
{
    if(shipArr[row][col] !== 0)
    {
        return false;
    }
    else if(numPieces === numShips)
    {
        return true;
    }
    else if(numPieces === (numShips - 1) )
    {
        if( (row-1>=0 && shipArr[row-1][col] === numShips) || (row+1 <10 &&shipArr[row+1][col] === numShips))
        {
            shipOrientation = 1;
            return true;
        }
        else if ( (col-1>=0 && shipArr[row][col-1] === numShips) || (col+1 <10 && shipArr[row][col+1] === numShips) )
        {
            shipOrientation = 2;
            return true;
        }
        else
        {
            return false;
        }        
    }
    else if(shipOrientation === 1 && numPieces>0 && ((row-1>=0 && shipArr[row-1][col] === numShips) ||  (row+1 <10 &&shipArr[row+1][col] === numShips)))
    {
        return true;
    }
    else if(shipOrientation === 2 && numPieces>0 && ((col-1>=0 && shipArr[row][col-1] === numShips) || (col+1 <10 && shipArr[row][col+1] === numShips)) )
    {
        return true;
    }
    else
    {
        return false;
    }
}