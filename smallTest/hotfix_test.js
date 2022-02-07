// hotfix test___________________
let matrix = [
     [5, 0, 0, 5],
     [0, 0, 0, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 5]
];
let matrixState = copyMatrix(matrix);

function copyMatrix(matrix) {
     // check matrix for change if the same not get random 2
     let currentMatrixState = []; // make matrix copy
     for (let i = 0; i < matrix.length; i++) {
          let row = [];
          for (let j = 0; j < matrix[i].length; j++) {
               row.push(matrix[i][j]);
          }
          currentMatrixState.push(row);
     }
     return currentMatrixState;
}

function checkForNEWmatrixState(matrixState, matrix) {
     let isUpdated = false;
     for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
               if (matrixState[i][j] != matrix[i][j]) {
                    isUpdated = true;
                    break;
               }
          }

     }
     return isUpdated;
}
matrix[0][0]=10;
if (checkForNEWmatrixState(matrixState, matrix) == true) {
     console.log("Y can move");
     console.table(matrixState);
     console.table(matrix);
}
else {
     console.table(matrixState);
     console.table(matrix);
}