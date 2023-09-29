const { expect } = require('chai');
const NumbersValidator = require('../app/NumbersValidator');

let validator;

describe('isNumberEven test', () => {
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });

it('should return true if element is even', () => {
    const validationResults = validator.isNumberEven(4);
    expect(validationResults).to.be.equal(true);
  });

it('should return false if element is odd', () => {
    const validationResults = validator.isNumberEven(5);
    expect(validationResults).to.be.equal(false);
  });

it('should throw an error if element is not a number', () => {
    expect(() => {
      validator.isNumberEven('4');
    }).to.throw('[4] is not of type "Number" it is of type "string"');
  });
});
