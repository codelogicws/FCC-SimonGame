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


class ButtonClickTester{
  private cornerCutOff = 255
  private xCutOff:number
  private yCutOff:number
  private fullEnd = c.width/2
  private expectedX:number
  private expectedY:number
  private x:number
  private y:number

  public constructor(x:number, y:number, xFlip:boolean, yFlip:boolean){
    this.x = x
    this.y = y
    this.expectedX = (y >= this.cornerCutOff)? this.fullEnd - (y-this.cornerCutOff) : this.fullEnd
    this.expectedY = (x >= this.cornerCutOff)? this.fullEnd - (x-this.cornerCutOff) : this.fullEnd
  }

  public isButtonPressed(){
    return (this.x < this.expectedX && this.y < this.expectedY)
  }

    // function isLightPressed(x:number, y:number, xFlip:boolean, yFlip:boolean){
    //   let cornerCutOff = 225;
    //   let xCutOff:number = (xFlip)? (c.width - cornerCutOff) : cornerCutOff
    //   let yCutOff:number = (yFlip)? (c.height - cornerCutOff): cornerCutOff
    //   let fullEnd:number = c.width/2
    //   let exprectedX = (xFlip)? cornerExpectAxisFlipped(cornerCutOff, fullEnd, y): cornerExpectAxis(cornerCutOff, fullEnd, y)
    //   let exprectedY = (xFlip)? cornerExpectAxisFlipped(cornerCutOff, fullEnd, x): cornerExpectAxis(cornerCutOff, fullEnd, x)
    // }
    //
    // function cornerExpectAxis(cornerCutOff:number, fullLength:number, XorY:number){
    //   return (XorY >= cornerCutOff)? fullLength - (XorY-cornerCutOff) : fullLength
    // }
    //
    // //TODO Needs work
    // function cornerExpectAxisFlipped(cornerCutOff:number, fullLength:number, XorY:number){
    //   return (XorY >= cornerCutOff)? fullLength - (XorY-cornerCutOff) : fullLength
    // }
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
drawEverything(false, false, false, false);

c.addEventListener('click', function(event) {
    let x = 1000 * ((event.pageX-elemLeft)/c.offsetWidth)
    let y = 1000 * ((event.pageY-elemTop)/c.offsetHeight)

    let greenTester:ButtonClickTester = new ButtonClickTester(x, y, false, false);
    let blueTester:ButtonClickTester = new ButtonClickTester(x, y, true, true);

    if(greenTester.isButtonPressed()){
      alert('You pressed Green')
    }else if(blueTester.isButtonPressed()){
      alert('You pressed Blue')
    }

}, false);


function drawEverything(greenButtonOn:boolean, redButtonOn:boolean, blueButtonOn:boolean, yellowButtonOn:boolean){
  createSimonBase()
  createCenter()
  addNormalShadow()
  createSmallButton('#ff0', 365, 510)
  createSmallButton('#f00', 635, 510)
  createCountDisplay();
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
