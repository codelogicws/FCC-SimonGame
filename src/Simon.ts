///<reference path='../typings/browser/definitions/lodash/index.d.ts'/>
///<reference path='Draw.ts/>

let comboMemory:BUTTONCOLOR[] = [];
let userIndex:number = 0;
let playbackID:number;
let userTurn:boolean = false;
let strictMode:boolean = false;
let blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
let greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
let redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
let yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
let errorSound = new Audio('http://www.freesfx.co.uk/rx2/mp3s/9/11111_1393961399.mp3');

function gameStart(){
  computersTurnNewColor()
}

function computersTurnNewColor(){
  newColor()
  computersTurn()
}

function computersTurn(){
  userTurn = false;
  userIndex = 0;
  playColors();
}

function gameOver(){
  return comboMemory.length > 20
}

function getCombo(){
  return comboMemory
}

function newColor(){
   let random:number = Math.floor(   Math.random() * (4 - 0) + 0)
   console.log(random + ' this is the random number');
   comboMemory.push(random)
}

function playColors(){
   playbackID = window.setInterval(playNextNumber, 1000)
}

function playNextNumber(){
  playColor(comboMemory[userIndex++])
  if (  switchTurn()  ){
    clearInterval(playbackID);
    userTurn = true;
    userIndex = 0;
  }
}

function playColor(color:BUTTONCOLOR){
  switch(color){
    case BUTTONCOLOR.BLUE:
         blueSound.play()
         lightButton(0,0,1,0)
         break;
    case BUTTONCOLOR.GREEN:
         greenSound.play()
         lightButton(1,0,0,0)
         break;
    case BUTTONCOLOR.RED:
         redSound.play()
         lightButton(0,1,0,0)
         break;
    case BUTTONCOLOR.YELLOW:
         yellowSound.play()
         lightButton(0,0,0,1)
         break;
    }
  console.log(BUTTONCOLOR[color]);
}

function lightButton(g, r, b, y){
  drawEverything(g, r, b ,y)
  window.setTimeout(()=>{
    drawEverything(0,0,0,0)
  }, 350)
}

function switchTurn(){
  return userIndex >= comboMemory.length;
}

function pressColor(color:BUTTONCOLOR){
  if(userTurn){
    playColor(color);
    if(color == comboMemory[userIndex]){
      userIndex++;
      checkIfTurn()
    }else{
      loseGame();
    }
  }
}

function checkIfTurn(){
  if(switchTurn()){
    if (userIndex == 20){
      alert("Good Job! You Win!")
    } else{
      alert("your turn is over")
      computersTurnNewColor()
    }
  }
}

function loseGame(){
  errorSound.play();
  if(strictMode){
    alert('Game Over You Lose')
    comboMemory = []
    computersTurnNewColor()
  }else{
    alert('retry');
    computersTurn()
  }
}

enum BUTTONCOLOR{
  BLUE,
  GREEN,
  RED,
  YELLOW
}

gameStart()
