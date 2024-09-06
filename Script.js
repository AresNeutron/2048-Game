//Variables
let boardArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
const listOfClasses= ['meh','one','two','three','four','five','six','seven','eight','nine','ten','eleven']
const newBtn = document.querySelector('button')
const scoreDisplay = document.querySelector('#score')
const bestDisplay = document.querySelector('#best')
const boxes = [...document.getElementsByClassName('box')]
const boxesArray = [boxes.slice(0,4),boxes.slice(4,8),boxes.slice(8,12),boxes.slice(12,16)]
let score=0
let best=0

//New Game
const newGame=()=>{
    boardArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    boxes.forEach(el=>el.innerHTML='')
    if(score>best) best= score
    bestDisplay.textContent=`${best>99 ? '':'0'}${best > 9 ? '':'0'}${best}`
    score=0
    scoreDisplay.innerText='000'
    randomTwo()
    randomTwo()
}

//Set Board
const setBoard=(board)=>{
    boxes.forEach(el=>el.innerHTML='')
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]!==0){
                const logNum = Math.log(board[i][j])/Math.log(2)
                boxesArray[i][j].innerHTML = `<div class='number ${listOfClasses[logNum]}'>${board[i][j]}</div>`
            }
        }
    }
}

//Random Two
const randomTwo=()=>{
    while (true){
        let x = Math.floor(Math.random()*4)
        let y = Math.floor(Math.random()*4)
        if(boardArray[x][y] ===0){
            boardArray[x][y] = 2
            setBoard(boardArray) //Aquí se agrega un '2'
            break
        } 
    }
}

//Check Collision
const checkCollision=(board,direction)=>{
    for(let i=0;i<4;i++){
        const newRow = board[i].filter((el)=>el!==0)
        if(direction){
            for(let j=0;j<newRow.length-1;j++){
                if(newRow[j] ===newRow[j+1]){
                    newRow[j]=newRow[j]*2
                    score+=newRow[j]
                    newRow[j+1]=0
                }
            }
        }else{
            for(let j=newRow.length-1;j>0;j--){
                if(newRow[j] ===newRow[j-1]){
                    newRow[j]=newRow[j]*2
                    score+=newRow[j]
                    newRow[j-1]=0
                }
            }
        }
        board[i]=newRow
        while (board[i].length < 4) direction ? board[i].push(0) : board[i].unshift(0) //Rellenar
    }
}

//Adjust Row
const adjustRow=(x)=>{ 
    let moved = false
    const oldBoard = boardArray.map(row => [...row]); // Hacer una copia profunda
    boardArray = [[],[],[],[]]
    checkCollision(oldBoard,x)
    for(let i=0;i<4;i++){
        const newRow = oldBoard[i].filter((el)=>el!==0)
        boardArray[i] = [...newRow] //Use the spread operator to avoid errors
        while (boardArray[i].length < 4){
            x ? boardArray[i].push(0) : boardArray[i].unshift(0)
        }
        if (newRow.length !== oldBoard[i].length || 
            boardArray[i].some((el, index) => el !== oldBoard[i][index])) {
            moved = true;
        }
    }
    setBoard(boardArray)
    scoreDisplay.textContent=`${score>99 ? '':'0'}${score > 9 ? '':'0'}${score}`
    return moved;
}

//Invert Matrix
const invertMatrix=(render=false)=>{
    const oldBoard = boardArray.map(row => [...row]); // Hacer una copia profunda
    boardArray=[[],[],[],[]]
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            boardArray[i][j]=oldBoard[j][i]
        }
    }
    if(render) setBoard(boardArray)
}

//Adjust Column
const adjustCol=(y)=>{
    invertMatrix()
    let moved =adjustRow(y)
    invertMatrix(true)
    return moved;
}

//Handle Key Press
const handleKeyPress = (event) => {
    let moved = false;
    if (event.key === "ArrowUp") {
        moved = adjustCol(true);
    } else if (event.key === "ArrowDown") {
        moved = adjustCol(false);
    } else if (event.key === "ArrowLeft") {
        moved = adjustRow(true);
    } else if (event.key === "ArrowRight") {
        moved = adjustRow(false);
    }
    boardArray.forEach((row)=> {
        if(row.some((col)=>col === 2048)) alert('Congratulations, you win. Press New Game to play again.')
    })
    if (moved) {
        setTimeout(randomTwo,300)
    }else{
        if(boxes.every((el)=>el.innerHTML!=='')) alert('Game Over. Press New Game to start again.')
    }
};

newGame()

//Event Listeners
document.addEventListener('keyup',handleKeyPress)
newBtn.onclick=newGame