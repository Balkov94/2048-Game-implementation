
//sumToLeft ! Working
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

// !!!work!!!
// moveToLeftB(m,2,4)
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

// START RIGHT____________________________________________________________________________________
//sumToRight fixed
function sumToRight(m, row) {
     let curr = m[row][3];
     let currRow = row;
     let currCol = 3;
     for (let i = 2; i >= 0; i--) { //row stay same
          if (curr == m[row][i] && curr != 0) {
               m[row][i] *= 2;
               m[currRow][currCol] = 0;
               // curr become next element!=0
               if(i-1>=0){
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
//___________________________________________________________________
// moveTorightBorder is Working!!!
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
// !!!!!!!!!!!!!!!!!!!!!!!!____________________________________________________________________
//  sumToDown - fixed!
function sumToDown(m,col) { // col stay same
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

// !!! move to downBorder__________________________________________
// Working! Fixed!
function moveToDownBorder(m,col) {
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

// !!! sumUp !!!!________________________________________________________________________________
// working !!! Fixed!
let m = [
     [4, 4, 4, 2], //
     [2, 4, 4, 2], //
     [2, 2, 4, 2], //
     [2, 2, 2, 4]  //
];

function sumToUP(m,col) {//col stay same
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

// movetoUpBorder___________________________________________________
function moveToTopBorder(m,col) {
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

// _____________________________________________________________________________
// Game_overChecher
//  Done!
function gameOverChecker(m) {
     let checker = true;
     let flag = false;
     for (let i = 0; i < 4; i++) {

          for (let k = 0; k < 4; k++) {
               let currCell = m[i][k];
               if (i - 1 >= 0 && m[i - 1][k] == currCell) {
                    checker = false;
                    flag = true;
                    break;
               }
               if (i + 1 < 4 && m[i + 1][k] == currCell) {
                    checker = false;
                    flag = true;
                    break;
               }
               if (k + 1 < 4 && m[i][k + 1] == currCell) {
                    checker = false;
                    flag = true;
                    break;
               }
               if (k - 1 >= 0 && m[i][k - 1] == currCell) {
                    checker = false;
                    flag = true;
                    break;
               }
               // if (m[i + 1][k] == currCell || m[i - 1][k] == currCell ||
               //      m[i][k - 1] == currCell || m[i][k + 1] == currCell) {
               // }
          }
          if (flag) {
               break;
          }
     }
     return checker;
}









