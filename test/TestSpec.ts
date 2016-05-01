/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/definitions/chai/index.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', () => {

    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2+4).to.equals(6);
            done();
        });

        it('should not be 7', (done) => {
            expect(2+4).to.not.equals(7);
            done();
        });
    });
});
