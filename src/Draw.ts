/// <reference path='../typings/jquery/jquery.d.ts'/>


$(()=>{
console.log("loaded draw")

  $('#myCanvas').html('Hello there')
  var c = <HTMLCanvasElement> $('#myCanvas')[0]
  var ctx = c.getContext("2d")
  ctx.fillStyle = "#FF0000"
  ctx.fillRect(0,0, c.width, c.height)
  ctx.fillStyle = '#000000'
  createButton()


  console.log("loaded draw")

  function createButton(){
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(100, 550)
    ctx.lineTo(200, 550)
    ctx.lineTo(200, 450)
    ctx.lineTo(100, 450)
    ctx.closePath()
    ctx.stroke()
  }

})
