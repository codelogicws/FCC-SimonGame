/// <reference path='../typings/jquery/jquery.d.ts'/>

$(()=>{
console.log("loaded draw")

$('#myCanvas').html('Hello there');
var c = <HTMLCanvasElement> $('#myCanvas')[0]
var ctx = c.getContext("2d")
ctx.fillStyle = "#FF0000"
ctx.fillRect(0,0,150,75)

console.log("loaded draw")
})
