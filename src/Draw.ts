/// <reference path='../typings/jquery/jquery.d.ts'/>
/// <reference path='../typings/browser/definitions/lodash/index.d.ts'/>

const PI = Math.PI
const PI2DIV = Math.PI/2
const PI2 = Math.PI*2
const PI1ANDHALF = Math.PI * 1.5
const BUTTONGAP = 0.06
const COLOROFF = 180
const COLOROFFDARK = 90
const COLORON = 230
const COLORONDARK = 180


var c = <HTMLCanvasElement> $('#myCanvas')[0]
var ctx = c.getContext("2d")
drawEverything(false, false, false, false);


function drawEverything(greenButtonOn:boolean, redButtonOn:boolean, blueButtonOn:boolean, yellowButtonOn:boolean){
  createSimonBase()
  addNormalShadow()
  createCenter()
  createSmallButton('#ff0', 365, 510)
  createSmallButton('#f00', 635, 510)
  createCountDisplay();
  createButton(PI, PI2DIV, true, true, false, yellowButtonOn)
  createButton(PI2DIV, PI2, false,false,true, blueButtonOn)
  createButton(PI2, PI1ANDHALF, true,false,false, redButtonOn)
  createButton(PI1ANDHALF, PI, false,true,false, greenButtonOn)


  ctx.fillStyle = "black"
  ctx.font = "100px Patua One";
  ctx.fillText("Simon", 370, 420)
}


function createCountDisplay(){
  ctx.fillStyle = '#300'
  ctx.beginPath()
  ctx.rect(430, 450, 140, 120)
  ctx.fill();
}

function createSmallButton(color:string, x:number, y:number){
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 35, 0, PI2, false)
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.stroke()
}

function createCenter(){
  ctx.beginPath()
  ctx.fillStyle = '#eee'
  var my_gradient=ctx.createLinearGradient(0,0,800,800);
  my_gradient.addColorStop(0,'white');
  my_gradient.addColorStop(1, '#999');
  ctx.fillStyle=my_gradient;
  ctx.beginPath()
  ctx.arc(500, 500, 200, 0, PI2, false)
  ctx.fill();
}

function createSimonBase(){
  ctx.fillStyle = '#111'
  ctx.beginPath()
  ctx.arc(500, 500, 495, 0, PI2, false)
  ctx.fill()
}

function createButton(radian1:number, radian2:number, redOn:boolean, greenOn:boolean, blueOn:boolean, lightOn:boolean){
  ctx.beginPath()
  //gradient
  var my_gradient=ctx.createLinearGradient(0,0,800,800);
  my_gradient.addColorStop(0,getLightColor(COLORON, COLOROFF, redOn, greenOn, blueOn, lightOn ));
  my_gradient.addColorStop(1,getLightColor(COLORONDARK, COLOROFFDARK, redOn, greenOn, blueOn, lightOn ));
  ctx.fillStyle=my_gradient;
  //-----
  let innerRadius = 250
  let outerRadius = 450
  ctx.arc(500, 500, innerRadius, radian1-(BUTTONGAP*(outerRadius/innerRadius)) , radian2 + (BUTTONGAP*(outerRadius/innerRadius)), true)
  ctx.arc(500, 500, outerRadius, radian2 + BUTTONGAP, radian1 - BUTTONGAP, false)
  ctx.fill()
}

function addNormalShadow(){
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 20
}

function getLightColor(onNumber:number, offNumber:number, redOn:boolean, greenOn:boolean, blueOn:boolean, lightOn:boolean){
  return 'rgb(' +
    ((redOn)? getColor(onNumber, offNumber, lightOn) : 0).toString() +
    ',' +
    ((greenOn)? getColor(onNumber, offNumber, lightOn): 0).toString() +
    ',' +
    ((blueOn)? getColor(onNumber, offNumber, lightOn): 0).toString() +
    ')';
}

function getColor(onNumber:number, offNumber:number,lightOn:boolean){
  return (lightOn)? onNumber : offNumber;
}

class ColorConfig{
  constructor(redOn:boolean, greenOn:boolean, blueOn:boolean){
    //Light On
  }

}
