let boxes = document.querySelectorAll('.box');
let rstBtn = document.querySelector('#restart');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;
let count = 0;

const winningComb = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const resetGame = () =>{
    turn0 = true;
    enabledBoxes();
    count = 0;
    msgContainer.classList.add('hide');
}

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        
        if(turn0){
            box.innerText = "O";
            turn0=false;
        }
        else{
            box.innerText = "X";
            turn0=true;
        }
        box.disabled = true;
        count ++;
        let winner = checkWinner();

        if(count === 9 && !winner){
            gameDraw();
        }
    });
});


const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
  };

let disabledBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
}

let enabledBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

let showWinner = (winner) =>{
    msg.innerHTML = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disabledBoxes();
}

let checkWinner = ()=>{
    for(let pattern of winningComb){
        let pos1Value = boxes[pattern[0]].innerHTML;
        let pos2Value = boxes[pattern[1]].innerHTML;
        let pos3Value = boxes[pattern[2]].innerHTML;

        if(pos1Value != "" && pos2Value !="" && pos3Value != ""){
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                console.log("winner",pos1Value);
                showWinner(pos1Value);
            }
        }
    }
}


newGameBtn.addEventListener("click", resetGame);
rstBtn.addEventListener("click", resetGame);