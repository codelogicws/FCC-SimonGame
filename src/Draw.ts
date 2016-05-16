/// <reference path='../typings/jquery/jquery.d.ts'/>
/// <reference path='../typings/browser/definitions/lodash/index.d.ts'/>



class ColorConfig{
  onLight:string;
  onDark:string;
  offLight:string;
  offDark:string;

  constructor(redOn:boolean, greenOn:boolean, blueOn:boolean){
    this.onLight = this.getColorString(redOn, greenOn, blueOn, COLORON)
    this.onDark  = this.getColorString(redOn, greenOn, blueOn, COLORONDARK)
    this.offLight = this.getColorString(redOn, greenOn, blueOn, COLOROFF)
    this.offDark = this.getColorString(redOn, greenOn, blueOn, COLOROFFDARK)
  }

  public getLight(lightOn:boolean){
    return (lightOn)? this.onLight : this.offLight
  }

  public getDark(lightOn:boolean){
    return (lightOn)? this.onDark : this.offDark
  }

  private getColorString(redOn:boolean, greenOn:boolean, blueOn:boolean, colorNumber:number):string{
    return 'rgb(' +
      ((redOn)? colorNumber: 0).toString() +
      ', ' +
      ((greenOn)? colorNumber: 0).toString() +
      ', ' +
      ((blueOn)? colorNumber: 0).toString() +
      ')';
  }

}

class ExpectedAxis{
  shouldBeGreaterThen:boolean
  value:number

  public test(x:number){
    if(this.shouldBeGreaterThen)
      return x >= this.value
    return x <= this.value
  }
}


class ButtonClickTester{
  private cornerCutOff = 240
  private cornerCutOffInverse:number
  private center:number
  private x:number
  private y:number
  private yFlip:boolean
  private xFlip:boolean

  public constructor(x:number, y:number, xFlip:boolean, yFlip:boolean, canvasXandYLength:number){
    this.x = x
    this.y = y
    this.yFlip = yFlip
    this.xFlip = xFlip
    this.center = canvasXandYLength/2;
    this.cornerCutOffInverse = this.center + this.cornerCutOff
  }

  public isButtonPressed(){
    let xDiff:number = (this.yFlip)? this.cornerCutOffInverse - this.y : this.y - this.cornerCutOff
    let yDiff = (this.xFlip)? this.cornerCutOffInverse - this.x : this.x - this.cornerCutOff

    let xAwayFromCenter:number = (this.xFlip)? this.x - this.center : this.center - this.x
    let xAngleOk:boolean = xAwayFromCenter > xDiff

    let yAwayFromCenter:number = (this.yFlip)? this.y - this.center : this.center - this.y
    let yAngleOk:boolean = yAwayFromCenter > yDiff

    let ySquareOk = (this.yFlip)? this.y > this.center : this.y < this.center
    let xSqaureOk = (this.xFlip)? this.x > this.center : this.x < this.center

    return xAngleOk && xSqaureOk && yAngleOk && ySquareOk
  }

}

const PI = Math.PI
const PI2DIV = Math.PI/2
const PI2 = Math.PI*2
const PI1ANDHALF = Math.PI * 1.5
const BUTTONGAP = 0.06
const COLOROFF = 180
const COLOROFFDARK = 90
const COLORON = 255
const COLORONDARK = 200
const blueConfig:ColorConfig = new ColorConfig(false, false, true);
const redConfig:ColorConfig = new ColorConfig(true, false, false);
const yellowConfig:ColorConfig = new ColorConfig(true, true, false);
const greenConfig:ColorConfig = new ColorConfig(false, true, false);


var c = <HTMLCanvasElement> $('#myCanvas')[0]
var ctx = c.getContext("2d")
let elemLeft = c.offsetLeft
let elemTop = c.offsetTop
let canUseGameStartButton = true;

c.addEventListener('click', function(event) {
    let x = 1000 * ((event.pageX-elemLeft)/c.offsetWidth)
    let y = 1000 * ((event.pageY-elemTop)/c.offsetHeight)

    let greenTester:ButtonClickTester =  new ButtonClickTester(x, y, false, false, c.width);
    let blueTester:ButtonClickTester =   new ButtonClickTester(x, y, true,   true, c.width);
    let redTester:ButtonClickTester =    new ButtonClickTester(x, y, true,  false, c.width);
    let yellowTester:ButtonClickTester = new ButtonClickTester(x, y, false,  true, c.width);

    if(greenTester.isButtonPressed()){
      pressColor(BUTTONCOLOR.GREEN);
    }else if(blueTester.isButtonPressed()){
      pressColor(BUTTONCOLOR.BLUE);
    }else if(redTester.isButtonPressed()){
      pressColor(BUTTONCOLOR.RED);
    }else if(yellowTester.isButtonPressed()){
      pressColor(BUTTONCOLOR.YELLOW);
    }else if(startButtonPressed(x, y)){
      if(canUseGameStartButton){
        toggleSwitch.play()
        canUseGameStartButton = false;
        gameStart();
        gameStartRequestId = window.setTimeout(()=>{canUseGameStartButton = true}, 3000)
      }else{
        errorSound.play()
      }
      console.log('pressed start')
    }else if(strictButtonPressed(x, y)){
      toggleSwitch.play()
      toggleStrict()
      console.log('pressed strict')
    }

}, false);

function startButtonPressed(x:number, y:number){
  return smallButtonTestAt(x, y, 365, 510)
}

function strictButtonPressed(x:number, y:number){
  return smallButtonTestAt(x, y, 635, 510)
}

function smallButtonTestAt(x:number, y:number, buttonX:number, buttonY:number){
  let offset = 70;
  return x > buttonX - (offset/2) && x < buttonX + (offset/2) && y > buttonY - (offset/2) && y < buttonY + (offset/2)
}

function drawEverything(greenButtonOn:boolean, redButtonOn:boolean, blueButtonOn:boolean, yellowButtonOn:boolean, count:string = "0", strictModeOn:boolean){
  createSimonBase()
  createCenter()
  addNormalShadow()
  createSmallButton('#ff0', 365, 510)
  createSmallButton('#f00', 635, 510)
  createCountDisplay(count, strictModeOn);
  endShadow()
  createButton(PI, PI2DIV, yellowConfig, yellowButtonOn)
  createButton(PI2DIV, PI2, blueConfig, blueButtonOn)
  createButton(PI2, PI1ANDHALF, redConfig, redButtonOn)
  createButton(PI1ANDHALF, PI, greenConfig, greenButtonOn)


  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.font = "100px Patua One";
  ctx.fillText("Simon", 370, 420)
}


function createCountDisplay(count:string, strict:boolean){
  ctx.fillStyle = '#300'
  ctx.beginPath()
  ctx.rect(430, 450, 140, 120)
  ctx.fill();
  ctx.beginPath()
  ctx.fillStyle = '#800'
  ctx.font = "50px Patua One"
  ctx.fillText(makeDoubleDig(count), 475, 525)
  ctx.fillStyle = '#222'
  ctx.font = "20px Patua One"
  ctx.fillText('Start', 344, 570)
  ctx.fillText('Strict', 612.5, 570)
  if(strict){
    ctx.fillStyle = '#800'
    ctx.font = "33px Patua One"
    ctx.fillText('STRICT MODE', 400, 645)
  }
}

function makeDoubleDig(x:string){
  return (x.length > 1)? x : '0' + x
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

function createButton(radian1:number, radian2:number, colorConfig:ColorConfig, lightOn:boolean){
  ctx.beginPath()
  //gradient
  var my_gradient=ctx.createLinearGradient(0,0,800,800);
  my_gradient.addColorStop(0, colorConfig.getLight(lightOn));
  my_gradient.addColorStop(1, colorConfig.getDark(lightOn));
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

function endShadow(){
  ctx.shadowBlur = 0
}
