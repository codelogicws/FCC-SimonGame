/// <reference path='../typings/jquery/jquery.d.ts'/>

const PI = Math.PI
const PI2DIV = Math.PI/2
const PI2 = Math.PI*2
const PI1ANDHALF = Math.PI * 1.5
const BUTTONGAP = 0.06
const COLOROFF = 150
const COLORON = 220

$(()=>{
console.log("loaded draw")

  $('#myCanvas').html('Hello there')
  var c = <HTMLCanvasElement> $('#myCanvas')[0]
  var ctx = c.getContext("2d")

  createSimonBase()
  addNormalShadow()
  createCenter()
  createSmallButton('#ff0', 365, 510)
  createSmallButton('#f00', 635, 510)
  createCountDisplay();
  createButton(PI, PI2DIV, true, true, false)
  createButton(PI2DIV, PI2, false,false,true)
  createButton(PI2, PI1ANDHALF, true,false,false)
  createButton(PI1ANDHALF, PI, false,true,false)


  ctx.fillStyle = "black"
  ctx.font = "100px Patua One";
  ctx.fillText("Simon", 370, 420)

  console.log("loaded draw")

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

  function createButton(radian1:number, radian2:number, redOn:boolean, greenOn:boolean, blueOn:boolean){
    ctx.fillStyle = getLightColor(redOn, greenOn, blueOn, false);
    ctx.beginPath()
    //gradient
    // var my_gradient=ctx.createLinearGradient(0,0,800,800);
    // my_gradient.addColorStop(1,"black");
    // my_gradient.addColorStop(0,"white");
    // ctx.fillStyle=my_gradient;
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

  function getLightColor(redOn:boolean, greenOn:boolean, blueOn:boolean, lightOn:boolean){
    return 'rgb(' +
      ((redOn)? getColor(lightOn) : 0).toString() +
      ',' +
      ((greenOn)? getColor(lightOn): 0).toString() +
      ',' +
      ((blueOn)? getColor(lightOn): 0).toString() +
      ')';
  }

  function getColor(lightOn:boolean){
    return (lightOn)? COLORON : COLOROFF;
  }


})
