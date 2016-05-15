/// <reference path='../typings/jquery/jquery.d.ts'/>

const PI = Math.PI
const PI2DIV = Math.PI/2
const PI2 = Math.PI*2
const PI1ANDHALF = Math.PI * 1.5
const BUTTONGAP = 0.03

$(()=>{
console.log("loaded draw")

  $('#myCanvas').html('Hello there')
  var c = <HTMLCanvasElement> $('#myCanvas')[0]
  var ctx = c.getContext("2d")
  ctx.fillStyle = "#FF0000"
  ctx.fillRect(0,0, c.width, c.height)
  ctx.fillStyle = '#000000'
  createButton(PI, PI2DIV, '#770000');
  createButton(PI2DIV, PI2, '#007700');
  createButton(PI2, PI1ANDHALF, '#000077');
  createButton(PI1ANDHALF, PI, '#777700')


  console.log("loaded draw")

  function createButton(radian1:number, radian2:number, color:string){
    ctx.fillStyle = color
    ctx.beginPath()
    let innerRadius = 275
    let outerRadius = 475
    ctx.arc(500, 500, innerRadius, radian1-(BUTTONGAP*(outerRadius/innerRadius)) , radian2 + (BUTTONGAP*(outerRadius/innerRadius)), true)
    ctx.arc(500, 500, outerRadius, radian2 + BUTTONGAP, radian1 - BUTTONGAP, false)
    ctx.fill()
  }

})
