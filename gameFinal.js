const START_BTN = document.getElementById('reset');
const CONTAINER = document.getElementById("gameContainer");
const CURRENT_RECORD_ELEMENT = document.getElementById('currentRecord');
let currentRecord = 0;
if (localStorage.getItem('currentRecord')) {
    currentRecord = JSON.parse(localStorage.getItem('currentRecord'))
} else {
    localStorage.setItem('currentRecord', JSON.stringify(currentRecord))
}
CURRENT_RECORD_ELEMENT.innerHTML = `Current record: ${currentRecord}`
let gameIsOn = false;
function GAME() {
    gameIsOn = true;

    let score = document.getElementById("result");
    score.innerHTML = 0 + "pts"
    const ROW_LENGTH = 4;
    const COL_LENGTH = 4;
    const boxArr = [];
    let scoreArr = [];

    let isRigthMovePosible = true;
    let isLeftMovePosible = true;
    let isDownMovePosible = true;
    let isUpMovePosible = true;

    function spawn() {
        let randomIndex = Math.floor(Math.random() * boxArr.length);
        if (boxArr[randomIndex].innerHTML == 0) {
            boxArr[randomIndex].innerHTML = 2;
            boxArr[randomIndex].style.backgroundColor = "brown";
        } else {
            spawn();
        }
    }

    //CREATE BOXES
    function createBoxes() {
        for (let i = 0; i < 16; i++) {
            let box = document.createElement('div');
            box.innerHTML = 0;
            boxArr.push(box);
            CONTAINER.appendChild(box);

        }
        spawn();
        spawn();
        for (let k = 0; k < boxArr.length; k++) {
            if (boxArr[k].innerHTML == 0) {
                boxArr[k].style.visibility = "hidden";
            }
        }
    }
    //MOVE RIGHT
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let rowArr = [];
                rowArr.push(parseInt(boxArr[i].innerHTML));
                rowArr.push(parseInt(boxArr[i + 1].innerHTML));
                rowArr.push(parseInt(boxArr[i + 2].innerHTML));
                rowArr.push(parseInt(boxArr[i + 3].innerHTML));
                rowArr = rowArr.filter(x => x);
                let empty = ROW_LENGTH - rowArr.length;
                for (let k = 0; k < empty; k++) {
                    //zeros to left of the nums;
                    rowArr.unshift(0);
                }
                boxArr[i].innerHTML = rowArr[0];
                boxArr[i + 1].innerHTML = rowArr[1];
                boxArr[i + 2].innerHTML = rowArr[2];
                boxArr[i + 3].innerHTML = rowArr[3];
            }
        }
    }



    //MOVE LEFT
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let rowArr = [];
                rowArr.push(parseInt(boxArr[i].innerHTML));
                rowArr.push(parseInt(boxArr[i + 1].innerHTML));
                rowArr.push(parseInt(boxArr[i + 2].innerHTML));
                rowArr.push(parseInt(boxArr[i + 3].innerHTML));
                rowArr = rowArr.filter(x => x);
                let empty = ROW_LENGTH - rowArr.length;
                for (let k = 0; k < empty; k++) {
                    //zeros to the right from nums
                    rowArr.push(0);
                }
                boxArr[i].innerHTML = rowArr[0];
                boxArr[i + 1].innerHTML = rowArr[1];
                boxArr[i + 2].innerHTML = rowArr[2];
                boxArr[i + 3].innerHTML = rowArr[3];
            }
        }
    }
    //MOVE DOWN
    function moveDown() {
        for (let i = 0; i < COL_LENGTH; i++) {
            let colArr = [];
            colArr.push(parseInt(boxArr[i].innerHTML));
            colArr.push(parseInt(boxArr[i + COL_LENGTH].innerHTML));
            colArr.push(parseInt(boxArr[i + (COL_LENGTH * 2)].innerHTML));
            colArr.push(parseInt(boxArr[i + (COL_LENGTH * 3)].innerHTML));
            colArr = colArr.filter(x => x);
            let empty = COL_LENGTH - colArr.length;
            for (let k = 0; k < empty; k++) {
                colArr.unshift(0);
            }
            boxArr[i].innerHTML = colArr[0];
            boxArr[i + COL_LENGTH].innerHTML = colArr[1];
            boxArr[i + (COL_LENGTH * 2)].innerHTML = colArr[2];
            boxArr[i + (COL_LENGTH * 3)].innerHTML = colArr[3];
        }
    }
    //MOVE UP
    function moveUp() {
        for (let i = 0; i < COL_LENGTH; i++) {
            let colArr = [];
            colArr.push(parseInt(boxArr[i].innerHTML));
            colArr.push(parseInt(boxArr[i + COL_LENGTH].innerHTML));
            colArr.push(parseInt(boxArr[i + (COL_LENGTH * 2)].innerHTML));
            colArr.push(parseInt(boxArr[i + (COL_LENGTH * 3)].innerHTML));
            colArr = colArr.filter(x => x);
            let empty = COL_LENGTH - colArr.length;
            for (let k = 0; k < empty; k++) {
                colArr.push(0);
            }
            boxArr[i].innerHTML = colArr[0];
            boxArr[i + COL_LENGTH].innerHTML = colArr[1];
            boxArr[i + (COL_LENGTH * 2)].innerHTML = colArr[2];
            boxArr[i + (COL_LENGTH * 3)].innerHTML = colArr[3];
        }
    }
    //SUM ROWS
    function sumInnerHtml() {
        for (let i = 0; i < 15; i++) {
            if (boxArr[i].innerHTML === boxArr[i + 1].innerHTML) {
                let sum = parseInt(boxArr[i].innerHTML) + parseInt(boxArr[i + 1].innerHTML);
                boxArr[i].innerHTML = sum;
                boxArr[i + 1].innerHTML = 0;
            }
        }
    }
    //SUM COLS DOWN
    function sumColDown() {
        for (let i = 15; i >= 4; i--) {
            if (boxArr[i].innerHTML === boxArr[i - COL_LENGTH].innerHTML) {
                let sum = parseInt(boxArr[i].innerHTML) + parseInt(boxArr[i - COL_LENGTH].innerHTML);
                boxArr[i].innerHTML = sum;
                boxArr[i - COL_LENGTH].innerHTML = 0;
            }
        }
    }
    //SUM COLS UP
    function sumColUP() {
        for (let i = 0; i < 12; i++) {
            if (boxArr[i].innerHTML === boxArr[i + COL_LENGTH].innerHTML) {
                let sum = parseInt(boxArr[i].innerHTML) + parseInt(boxArr[i + COL_LENGTH].innerHTML);
                boxArr[i].innerHTML = sum;
                boxArr[i + COL_LENGTH].innerHTML = 0;
            }
        }
    }


    //IS There zero element to spawn new number;
    function isZero(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerHTML == 0) {
                return true;
            }
        }
        return false;
    }
    //RIGTH
    function rigth() {
        moveRight();
        sumInnerHtml();
        moveRight();
        if (isZero(boxArr)) {
            isRigthMovePosible = true;
            isLeftMovePosible = true;
            isUpMovePosible = true;
            isDownMovePosible = true;
            spawn();
            color();
        } else {
            isRigthMovePosible = false;
        }
    }
    //LEFT
    function left() {
        moveLeft();
        sumInnerHtml();
        moveLeft();
        if (isZero(boxArr)) {
            isRigthMovePosible = true;
            isLeftMovePosible = true;
            isUpMovePosible = true;
            isDownMovePosible = true
            spawn();
            color();
        } else {
            isLeftMovePosible = false;
        }
    }
    //DOWN
    function down() {
        moveDown();
        sumColDown()
        moveDown();
        if (isZero(boxArr)) {
            isRigthMovePosible = true;
            isLeftMovePosible = true;
            isUpMovePosible = true;
            isDownMovePosible = true;
            spawn();
            color();
        } else {
            isDownMovePosible = false;
        }
    }
    //UP
    function up() {
        moveUp();
        sumColUP();
        moveUp();
        if (isZero(boxArr)) {
            isRigthMovePosible = true;
            isLeftMovePosible = true;
            isUpMovePosible = true;
            isDownMovePosible = true;
            spawn();
            color();
        } else {
            isUpMovePosible = false;
        }
    }
    //COLOR
    function color() {
        boxArr.forEach((s) => {
            if (Number(s.innerHTML == 2)) {
                s.style.backgroundColor = "brown";
            } else if (Number(s.innerHTML == 4)) {
                s.style.backgroundColor = "lightblue";
            } else if (Number(s.innerHTML == 8)) {
                s.style.backgroundColor = "blue";
            } else if (Number(s.innerHTML == 16)) {
                s.style.backgroundColor = "lightgreen";
            } else if (Number(s.innerHTML == 32)) {
                s.style.backgroundColor = "green";
            } else if (Number(s.innerHTML == 64)) {
                s.style.backgroundColor = "darkgreen";
            } else if (Number(s.innerHTML == 128)) {
                s.style.backgroundColor = "salmon";
            } else if (Number(s.innerHTML == 256)) {
                s.style.backgroundColor = "darksalmon";
            } else if (Number(s.innerHTML == 512)) {
                s.style.backgroundColor = "coral";
            } else if (Number(s.innerHTML == 1024)) {
                s.style.backgroundColor = "orangered";
            } else if (Number(s.innerHTML == 2048)) {
                s.style.backgroundColor = "darkorange";
            } else if (Number(s.innerHTML == 4096)) {
                s.style.backgroundColor = "black";
                s.style.color = "white"
            }
        })
    }
    //GAMEPLAY
    function gamePlay(e) {
        let key = e.code;
        if (key === "ArrowRight") {
            rigth();
        } else if (key === "ArrowLeft") {
            left();
        } else if (key === "ArrowUp") {
            up();
        } else if (key === "ArrowDown") {
            down();
        }
        for (let j = 0; j < boxArr.length; j++) {
            scoreArr.push(Number(boxArr[j].innerHTML));
        }
        score.innerHTML = Math.max(...scoreArr) + " pts.";
        //CHECK FOR GAME OVER
        if (!isRigthMovePosible && !isLeftMovePosible && !isUpMovePosible && !isDownMovePosible) {
            let result = Math.max(...scoreArr);
            currentRecord < result ? currentRecord = result : currentRecord;
            localStorage.setItem('currentRecord', JSON.stringify(currentRecord));
            alert(`Game Over!!!\nYour Score: ${score.innerHTML}`);
            document.removeEventListener('keyup', gamePlay)
            score.innerHTML = "Game over!!"
            gameIsOn = false;
            return
        }
        for (let k = 0; k < boxArr.length; k++) {
            if (Number(boxArr[k].innerHTML) === 0) {
                boxArr[k].style.visibility = "hidden";
            } else {
                boxArr[k].style.visibility = "visible";
            }
        }
    }
    createBoxes()
    document.addEventListener('keyup', gamePlay);
}
if (!gameIsOn) {
    GAME()
}
START_BTN.addEventListener('click', () => {
    if (!gameIsOn) {
        CONTAINER.innerHTML = '';
        GAME()
    }
})