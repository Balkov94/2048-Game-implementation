// add random 2
let wrapper = document.getElementById('wrapper');
let divs = document.getElementsByClassName('cell');
let newGameButton = document.getElementById('newGameB');
newGameButton.addEventListener('click', reload);
function reload() {
     sessionStorage.setItem("highScore", JSON.parse(localStorage.getItem("highScore")));
     localStorage.clear();
     localStorage.setItem("highScore", JSON.parse(sessionStorage.getItem("highScore")));
     location.reload();

}

window.addEventListener('load', start);
//save in lcoalstorage (browser)
let matrix;
if (JSON.parse(localStorage.getItem("matrix")) == null) {
     matrix = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
     ];
     //WOW !get element with id=score without DOM functions! 
     if (localStorage.getItem("highScore") == null) {
          highScore.innerText = "0";
          localStorage.setItem("highScore", 0);
     }
     else {
          highScore.innerText = JSON.parse(localStorage.getItem("highScore"));
     }
     score.innerText = "0";

}
else {
     matrix = JSON.parse(localStorage.getItem("matrix"));
     score.innerText = localStorage.getItem("score");
     highScore.innerText = localStorage.getItem("highScore");
     divsRefill(matrix)
     paintdivs();
}
// add random 2 in matrix
function getRandomDiv(matrix) {
     // check for free space
     let gotSpace = false;
     for (let i = 0; i < 4; i++) {
          let flag = false;
          for (let k = 0; k < 4; k++) {
               let currCell = matrix[i][k];
               if (currCell == 0) {
                    flag = true;
                    gotSpace = true;
                    break;

               }
          }
          if (flag) {
               break;
          }
     }
     // 
     if (gotSpace) {
          let x;
          let y;
          while (true) {
               x = getRandomInt();
               y = getRandomInt();

               let randomDiv = document.getElementById(`${x}${y}`);
               if (randomDiv.innerText == 0) {
                    randomDiv.innerText = "2";
                    randomDiv.style.backgroundColor = "pink";
                    matrix[x][y] = 2;
                    break;
               }
          }
     }
}

function paintdivs() {
     for (let i = 0; i < 4; i++) {
          for (let k = 0; k < 4; k++) {
               let currDiv = document.getElementById(`${i}${k}`);
               if (currDiv.innerText == "0") {
                    currDiv.style.backgroundColor = "rgb(59, 35, 35)";
               }
               else if (currDiv.innerText == "2") {
                    currDiv.style.backgroundColor = "pink";
               }
               else if (currDiv.innerText == "4") {
                    currDiv.style.backgroundColor = "orange";
               }
               else if (currDiv.innerText == "8") {
                    currDiv.style.backgroundColor = "rgb(235, 131, 52)";
               }
               else if (currDiv.innerText == "16") {
                    currDiv.style.backgroundColor = "rgb(113, 235, 52)";
               }
               else if (currDiv.innerText == "32") {
                    currDiv.style.backgroundColor = "rgb(52, 217, 235)";
               }
               else if (currDiv.innerText == "64") {
                    currDiv.style.backgroundColor = "rgb(52, 140, 235)";
               }
               else if (currDiv.innerText == "128") {
                    currDiv.style.backgroundColor = "rgb(52, 255, 235)";
               }
               else if (currDiv.innerText == "256") {
                    currDiv.style.backgroundColor = "rgb(52, 100, 235)";
               }
               else if (currDiv.innerText == "512") {
                    currDiv.style.backgroundColor = "rgb(90, 140, 205)";
               }
               else if (currDiv.innerText == "1024") {
                    currDiv.style.backgroundColor = "rgb(52, 140, 150)";
               }
               else if (currDiv.innerText == "2048") {
                    currDiv.style.backgroundColor = "#FFD700";
               }

          }
     }
}

function start() {
     // function start fill with 2 random - >2 only if the matrix is new (load not from save)
     if (score.innerText == 0 && localStorage.getItem("matrix") == null) {
          let divCounter = 0;  //0-15 
          for (let i = 0; i < 4; i++) {
               for (let k = 0; k < 4; k++) {
                    divs[divCounter].innerText = matrix[i][k];
                    divCounter++;
               }
          }
          // start with two random positioned ->2;
          let x1 = getRandomInt();
          let y1 = getRandomInt();

          let startingDiv1 = document.getElementById(`${x1}${y1}`);
          startingDiv1.innerText = "2";
          matrix[x1][y1] = 2;

          let x2 = getRandomInt();
          let y2 = getRandomInt();

          if (x1 == x2 || y2 == y1) {
               x2 = getRandomInt();
               y2 = getRandomInt();

               if (x1 == x2 || y2 == y1) {
                    x2 = getRandomInt();
                    y2 = getRandomInt();
               }
          }

          let startingDiv2 = document.getElementById(`${x2}${y2}`);
          startingDiv2.innerText = "2";
          matrix[x2][y2] = 2;

     }
     // from save or not -> CLear zeros (0) :)
     localStorage.setItem("matrix", JSON.stringify(matrix));
     paintdivs();
     hideZeros(matrix);
}

function getRandomInt() {
     return Math.floor(Math.random() * (4 - 0) + 0);
}
// ____________HOTFIX__________________________________
// can't move if u are next to the border and there is no ANY MATCH
function copyMatrix(matrix) {
     let currentMatrixState = [];
     for (let i = 0; i < matrix.length; i++) {
          let row = [];
          for (let j = 0; j < matrix[i].length; j++) {
               row.push(matrix[i][j]);
          }
          currentMatrixState.push(row);
     }
     return currentMatrixState;
}
function checkForNEWmatrixState(currentMatrixState, matrix) {
     let isUpdated = false;
     for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
               if (currentMatrixState[i][j] != matrix[i][j]) {
                    isUpdated = true;
                    break;
               }
          }
     }
     return isUpdated;
}
// __________________________________________________________

// move divs
window.addEventListener("keydown", move);

function move(event) {
     let correctKey = false;
     let key = event.keyCode;
     let currMatrixState = copyMatrix(matrix);

     if (key == 37) {
          moveLeft();
          correctKey = true;
     }
     else if (key == 39) {
          moveRight();
          correctKey = true;
     }
     else if (key == 38) {
          moveUp();
          correctKey = true;
     }
     else if (key == 40) {
          moveDown();
          correctKey = true;
     }
     // spam new 2(number) only if the key is correct (<-/-> ... arrows)
     if (correctKey == true) {
          divsRefill(matrix);
          paintdivs(matrix);

          gameOverChecker(matrix);
          // add random 2(nunber) only if matrix is updadet after move! (<- / -> ...)
          if (checkForNEWmatrixState(currMatrixState, matrix) === true) {
               getRandomDiv(matrix);
          }      
          getScore(matrix);
          getHighScore();

          youWon(matrix);
          let check = gameOverChecker(matrix);
          if (check) {
               window.alert("Game over!");
          }
          hideZeros(matrix);
     }
     //add updated matrix to  lcoalStorage_______________________________________
     if (localStorage.getItem("matrix") == null) {
          localStorage.setItem("matrix", JSON.stringify(matrix))
     }
     else {
          localStorage.setItem("matrix", JSON.stringify(matrix))
     }

}

function youWon() {
     for (let i = 0; i < 4; i++) {
          for (let k = 0; k < 4; k++) {
               let currElementDiv = getDiv(i, k);
               if (currElementDiv.innerText == "2048") {
                    window.alert("**********************************\n Congratulations! You won! \n **********************************");
               }
          }
     }
}

function hideZeros() {
     for (let i = 0; i < 4; i++) {
          for (let k = 0; k < 4; k++) {
               let currElementDiv = getDiv(i, k);
               if (currElementDiv.innerText == "0") {
                    currElementDiv.style.color = "transparent";
               }
               else {
                    currElementDiv.style.color = "white";
               }
          }
     }
}

function getDiv(row, col) {
     return document.getElementById(`${row}${col}`);
}
function divsRefill(matrix) {
     for (let i = 0; i < 4; i++) {
          for (let k = 0; k < 4; k++) {
               let innerT = matrix[i][k];
               getDiv(i, k).innerText = innerT;
          }
     }
}
function gameOverChecker(m) {
     let over = true;
     let isGameOver = false;
     let flag = false;
     let gotZero = false;
     for (let i = 0; i < 4; i++) {
          for (let k = 0; k < 4; k++) {
               let currCell = m[i][k];
               if (i - 1 >= 0 && m[i - 1][k] == currCell) {
                    over = false;
                    flag = true;
                    break;
               }
               if (i + 1 < 4 && m[i + 1][k] == currCell) {
                    over = false;
                    flag = true;
                    break;
               }
               if (k + 1 < 4 && m[i][k + 1] == currCell) {
                    over = false;
                    flag = true;
                    break;
               }
               if (k - 1 >= 0 && m[i][k - 1] == currCell) {
                    over = false;
                    flag = true;
                    break;
               }
          }
          if (flag) {
               break;
          }
     }
     // check for zero
     for (let i = 0; i < 4; i++) {
          let flag = false;
          for (let k = 0; k < 4; k++) {
               let currCell = m[i][k];
               if (currCell === 0) {
                    flag = true;
                    gotZero = true;
                    break;
               }
          }
          if (flag) {
               break;
          }
     }
     if (gotZero == false && over == true) {
          isGameOver = true;
     }
     return isGameOver;
}

function moveLeft() {
     // call f for all rows :0,1,2,3
     //______________functions(matrix. row)__row stay same / iteretes cols______
     sumToLeft(matrix, 0);
     sumToLeft(matrix, 1);
     sumToLeft(matrix, 2);
     sumToLeft(matrix, 3);

     moveToLeftBorder(matrix, 0);
     moveToLeftBorder(matrix, 1);
     moveToLeftBorder(matrix, 2);
     moveToLeftBorder(matrix, 3);

     function sumToLeft(m, row) {//row stay same
          let curr = m[row][0]; //curr = first element
          let currRow = row;    //iterete from 1 to 3(last)
          let currCol = 0;
          for (let i = 1; i < 4; i++) {
               if (curr == m[row][i]) {
                    m[row][i] *= 2;
                    m[currRow][currCol] = 0;
                    // curr become next element!=0
                    if (i + 1 < 4) {
                         curr = m[row][i + 1];
                         currRow = row;
                         currCol = i + 1;
                         i = i + 1;
                    }
               }
               else if (m[row][i] != curr && m[row][i] != 0) {
                    curr = m[row][i];
                    currRow = row;
                    currCol = i;
               }
               else if (m[row][i] == 0) {
                    continue;
               }
          }
     }

     function moveToLeftBorder(m, row) {
          let curr;
          let currRow;
          let currCol;
          for (let i = 0; i < 4; i++) {
               if (m[row][i] != 0) {
                    curr = m[row][i];
                    currRow = row;
                    currCol = i;

                    let zeroCounter = 0;
                    for (let k = 0; k < i; k++) {
                         if (m[row][k] == 0) {
                              zeroCounter++
                         }
                    }
                    if (zeroCounter > 0) {
                         m[currRow][currCol - zeroCounter] = curr;
                         m[currRow][currCol] = 0;
                    }
               }
          }
     }

}

function moveRight() {
     // row stay same / iterete cols
     sumToRight(matrix, 0);
     sumToRight(matrix, 1);
     sumToRight(matrix, 2);
     sumToRight(matrix, 3);

     moveToRightBorder(matrix, 0);
     moveToRightBorder(matrix, 1);
     moveToRightBorder(matrix, 2);
     moveToRightBorder(matrix, 3);

     function sumToRight(m, row) {
          let curr = m[row][3];
          let currRow = row;
          let currCol = 3;
          for (let i = 2; i >= 0; i--) { //row stay same
               if (curr == m[row][i] && curr != 0) {
                    m[row][i] *= 2;
                    m[currRow][currCol] = 0;
                    // curr become next element!=0
                    if (i - 1 >= 0) {
                         curr = m[row][i - 1];
                         currRow = row;
                         currCol = i - 1;
                         i = i - 1;
                    }
               }
               else if (m[row][i] != curr && m[row][i] != 0) {
                    curr = m[row][i];
                    currRow = row;
                    currCol = i;
               }
               else if (m[row][i] == 0) {
                    continue;
               }
          }
     }

     function moveToRightBorder(m, row) {
          let curr;
          let currRow;
          let currCol;
          for (let i = 3; i >= 0; i--) {
               if (m[row][i] != 0) {
                    curr = m[row][i];
                    currRow = row;
                    currCol = i;

                    let zeroCounter = 0;
                    for (let k = 3; k > i; k--) {
                         if (m[row][k] == 0) {
                              zeroCounter++
                         }
                    }
                    if (zeroCounter > 0) {
                         m[currRow][currCol + zeroCounter] = curr;
                         m[currRow][currCol] = 0;
                    }
               }
          }
     }


}

function moveDown() {
     // function input(matrix, col)
     // col stay same / iteretes rows
     sumToDown(matrix, 0);
     sumToDown(matrix, 1);
     sumToDown(matrix, 2);
     sumToDown(matrix, 3);

     moveToDownBorder(matrix, 0);
     moveToDownBorder(matrix, 1);
     moveToDownBorder(matrix, 2);
     moveToDownBorder(matrix, 3);

     function sumToDown(m, col) { // col stay same
          let curr = m[3][col]; //start from Row3 => -1(last)
          let currRow = 3;
          let currCol = col;
          for (let i = 2; i >= 0; i--) { //move rows
               if (curr == m[i][col]) {
                    m[i][col] *= 2;
                    m[currRow][currCol] = 0;
                    // curr become next element!=0
                    if (i - 1 >= 0) {
                         curr = m[i - 1][col];
                         currRow = i - 1;
                         currCol = col;
                         i = i - 1;
                    }
               }
               else if (m[i][col] != curr && m[i][col] != 0) {
                    curr = m[i][col];
                    currRow = i;
                    currCol = col;
               }
               else if (m[i][col] == 0) {
                    continue;
               }
          }
     }

     function moveToDownBorder(m, col) {
          let curr;
          let currRow;
          let currCol;
          for (let i = 3; i >= 0; i--) {
               if (m[i][col] != 0) {
                    curr = m[i][col];
                    currRow = i;
                    currCol = col;

                    let zeroCounter = 0;
                    for (let k = 3; k > i; k--) {
                         if (m[k][col] == 0) {
                              zeroCounter++
                         }
                    }
                    if (zeroCounter > 0) {
                         m[currRow + zeroCounter][currCol] = curr;
                         m[currRow][currCol] = 0;
                    }
               }
          }
     }

}

function moveUp() {
     // function input(matrix , col)
     // col stay same / iterete rows
     sumToUP(matrix, 0);
     sumToUP(matrix, 1);
     sumToUP(matrix, 2);
     sumToUP(matrix, 3);

     moveToTopBorder(matrix, 0)
     moveToTopBorder(matrix, 1)
     moveToTopBorder(matrix, 2)
     moveToTopBorder(matrix, 3)

     function sumToUP(m, col) {//col stay same
          let curr = m[0][col];  //rows moving from 0(curr) to last(3)
          let currRow = 0;
          let currCol = col;
          for (let i = 1; i < 4; i++) {
               if (curr == m[i][col]) {
                    m[i][col] *= 2;
                    m[currRow][currCol] = 0;
                    // curr become next element!=0
                    if (i + 1 < 4) {
                         curr = m[i + 1][col];
                         currRow = i + 1;
                         currCol = col;
                         i = i + 1;
                    }
               }
               else if (m[i][col] != curr && m[i][col] != 0) {
                    curr = m[i][col];
                    currRow = i;
                    currCol = col;
               }
               else if (m[i][col] == 0) {
                    continue;
               }
          }
     }

     function moveToTopBorder(m, col) {
          let curr;
          let currRow;
          let currCol;
          for (let i = 0; i <= 3; i++) {
               if (m[i][col] != 0) {
                    curr = m[i][col];
                    currRow = i;
                    currCol = col;

                    let zeroCounter = 0;
                    for (let k = 0; k < i; k++) {
                         if (m[k][col] == 0) {
                              zeroCounter++
                         }
                    }
                    if (zeroCounter > 0) {
                         m[currRow - zeroCounter][currCol] = curr;
                         m[currRow][currCol] = 0;
                    }
               }
          }
     }

}

function getScore(matrix) {
     let points = 0;
     for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
               points += matrix[i][j];
          }
     }
     score.innerText = points;
     localStorage.setItem("score", points);
}
function getHighScore() {
     if (JSON.parse(localStorage.getItem("highScore")) < JSON.parse(localStorage.getItem("score"))) {
          localStorage.setItem("highScore", localStorage.getItem("score"));
          highScore.innerText = localStorage.getItem("score");
     }
}


// block arrow keys to NOT move the screen
window.addEventListener("keydown", function (e) {
     if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
     }
}, false);

let howToPlay = document.getElementById("how-to-play");
howToPlay.addEventListener("click", function () {
     let infoDiv = document.getElementById('info')
     infoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
     infoDiv.style.border = "2px solid rgb(119, 228, 9)";
     setTimeout(function () {
          infoDiv.style.border = "none"
     }, 500);
     setTimeout({ behavior: 'smooth', block: 'start' });
})