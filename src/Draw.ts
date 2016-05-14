/// <reference path='../typings/jquery/jquery.d.ts'/>

$(()=>{
console.log("loaded draw")

$('#myCanvas').html('Hello there');
var c = <HTMLCanvasElement> $('#myCanvas')[0]
var ctx = c.getContext("2d")
ctx.fillStyle = "#FF0000"
ctx.fillRect(0,0, c.width, c.height)

ctx.moveTo

console.log("loaded draw")
})


function vmin(){
  //make normal points act like vmin
}
