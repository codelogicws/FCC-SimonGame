/// <reference path='../typings/jquery/jquery.d.ts'/>

const PI = Math.PI
const PI2DIV = Math.PI/2
const PI2 = Math.PI*2
const PI1ANDHALF = Math.PI * 1.5
const BUTTONGAP = 0.06

$(()=>{
console.log("loaded draw")

  $('#myCanvas').html('Hello there')
  var c = <HTMLCanvasElement> $('#myCanvas')[0]
  var ctx = c.getContext("2d")

  createSimonBase()
  createCenter()
  createButton(PI, PI2DIV, '#777700');
  createButton(PI2DIV, PI2, '#000077');
  createButton(PI2, PI1ANDHALF, '#770000');
  createButton(PI1ANDHALF, PI, '#007700')


  console.log("loaded draw")

  function createCenter(){
    ctx.fillStyle = '#eee'
    ctx.beginPath()
    ctx.arc(500, 500, 200, 0, PI2, false);
    ctx.fill();
  }

  function createSimonBase(){
    ctx.fillStyle = '#111'
    ctx.beginPath()
    ctx.arc(500, 500, 500, 0, PI2, false);
    ctx.fill()
  }

  function createButton(radian1:number, radian2:number, color:string){
    ctx.fillStyle = color
    ctx.beginPath()
    let innerRadius = 250
    let outerRadius = 450
    ctx.arc(500, 500, innerRadius, radian1-(BUTTONGAP*(outerRadius/innerRadius)) , radian2 + (BUTTONGAP*(outerRadius/innerRadius)), true)
    ctx.arc(500, 500, outerRadius, radian2 + BUTTONGAP, radian1 - BUTTONGAP, false)
    ctx.fill()
  }

})
