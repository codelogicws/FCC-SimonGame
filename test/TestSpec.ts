/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/definitions/chai/index.d.ts" />
import chai = require('chai');
import {Simon, BUTTON} from "../src/Simon";
var expect = chai.expect;


describe('Game Core', () => {

  let simon:Simon;

  beforeEach(()=>{
    simon = new Simon()
  })


  it('can get the colors array', () => {
    expect(simon.getCombo()).to.deep.equals([])
  })

  it('can add random colors to simon pattern there should only be up to 4 colors randomly chosen', () => {
    simon.newColor()
    simon.newColor()
    simon.newColor()
    simon.newColor()
    simon.newColor()
    simon.getCombo().forEach((element)=>{
      expect(element).to.be.within(0, 3);
    })
  })

});
