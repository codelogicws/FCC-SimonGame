export class Simon{
  //what should I call each color pop up.
  private combo:BUTTON[]

  constructor(){
    this.combo = []
  }

  public getCombo(){
    return this.combo
  }

  public newColor(){
     let random:number = Math.floor(   Math.random() * (4 - 0) + 0)
     this.combo.push(random)
  }
}

export enum BUTTON{
  GREEN,
  RED,
  BLUE,
  YELLOW
}
