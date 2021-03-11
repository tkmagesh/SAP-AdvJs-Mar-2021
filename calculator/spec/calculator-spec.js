//describe, it, expect, matchers
describe('A Calculator', function(){
    it('should add two numbers', function(){
        //Arrange
        var expectedResult = 30;

        //Act
        var result = add(10,20);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add two numbers in string format', function(){
        //Arrange
        var expectedResult = 30;

        //Act
        var result = add(10,'20');

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should ignore string that cannot be converted to number', function(){
        //Arrange
        var expectedResult = 10;

        //Act
        var result = add(10,'abc');

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add array of numbers', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add([10,20], [30,40]);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add arrays with numbers in string format', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add([10,20], [30,'40']);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should ignore strings in the given array', function(){
        //Arrange
        var expectedResult = 60;

        //Act
        var result = add([10,20], [30,'abc']);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add nested arrays', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add([10,20], [[30,'abc'],40]);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add functions returning numbers', function(){
        //Arrange
        var expectedResult = 30;

        //Act
        var result = add(function(){ return 10; }, function(){ return 20; });

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add functions returning nested array of number and string', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add(function(){ return [10,20]}, function(){ return [[30,'abc'],40]});

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add array of functions returning array of number and string', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add([function(){ return [10,20]}, function(){ return [[30,'abc'],40]}]);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add one number', function(){
        //Arrange
        var expectedResult = 10;

        //Act
        var result = add(10);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should return 0 when not arguments are passed', function(){
        //Arrange
        var expectedResult = 0;

        //Act
        var result = add();

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add varying number of arguments', function(){
        //Arrange
        var expectedResult = 150;

        //Act
        var result = add(10,20,30,40,50);

        //Assert
        expect(result).toBe(expectedResult);
    });

});

