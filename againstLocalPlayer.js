var p2attackArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var p2shipArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let whosTurn = 1;

function localIsReady()
{
    if(numShips === 0)
    {
        if(whosTurn === 1)
        {
            //load selection grid for player2
            whosTurn = 2;
            
        }
        else
        {
            //loadAttackGrid for Player 1 beginning attack phase
        }
    }
    else
    {
        console.log('Not Ready');
    }
}
function attackLocal(row, col, el, playerArr)
{
    //test
    if(playerArr[row][col] !== 0 )
    {
        numHits++;
        attackArr[row][col] = 1;
        el.className = 'successfulAttack';
        if(numHits === hitsToWin)
        {
            //let winNotification = document.createElement();
        }
        else
        {
            loadOtherPlayer();
        }
    }
    else
    {
        el.className = 'missedAttack';
        loadOtherPlayer();
    }
}