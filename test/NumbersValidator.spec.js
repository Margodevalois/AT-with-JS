const { expect } = require('chai');
const NumbersValidator = require('../app/NumbersValidator');

let validator;

describe('NumbersValidator class tests', () => {
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });

  describe('isNumberEven test', () => {
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

  describe('getEvenNumbersFromArray test', () => {
    it('should return array of even numbers', () => {
      const arrayOfNums = [1, 2, 3, 4];
      const validationResults = validator.getEvenNumbersFromArray(arrayOfNums);
      expect(validationResults).to.deep.equal([2, 4]);
    });

    it('should throw an error if element is not full of numbers', () => {
      const arrayOfValues = [1, '2', 3, 4];
      expect(() => {
        validator.getEvenNumbersFromArray(arrayOfValues); // ПОМЕНЯТЬ МАССИВ
      }).to.throw('[1,2,3,4] is not an array of "Numbers"');
    });
  });

  describe('isAllNumbers test', () => {
    it('should return true if all elements in array are numbers', () => {
      const validationResults = validator.isAllNumbers([1, 2, 3, 4]);
      expect(validationResults).to.be.equal(true);
    });

    it('should return false if not all elements in array are numbers', () => {
      const validationResults = validator.isAllNumbers(['1', '2', 3, 4]);
      expect(validationResults).to.be.equal(false);
    });

    it('should throw an error if element is not an array', () => {
      expect(() => {
        validator.isAllNumbers('4');
      }).to.throw('[4] is not an array');
    });
  });

  describe('isInteger test', () => {
    it('should return true if value is integer', () => {
      const validationResults = validator.isInteger(2);
      expect(validationResults).to.be.equal(true);
    });

    it('should throw an error if value is not integer', () => {
      expect(() => {
        validator.isInteger('4');
      }).to.throw('[4] is not a number');
    });
  });
});
