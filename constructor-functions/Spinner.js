function Spinner(){
    //this -> new object
    var counter = 0;
    this.up = function(){
        return ++counter;
    };
    this.down = function(){
        return --counter;
    }
    //this -> returned by default
}


function Spinner(){
    //this -> new object
    this.__counter__ = 0;
    //this -> returned by default
}
Spinner.prototype.up = function(){
    return ++this.__counter__;
};
Spinner.prototype.down = function(){
    return --this.__counter__;
}


//using symbol

var Spinner = (function(){
    var counterSymbol = Symbol();

    function Spinner(){
        //this -> new object
        this[counterSymbol] = 0;
        //this -> returned by default
    }
    Spinner.prototype.up = function(){
        return ++this[counterSymbol];
    };
    Spinner.prototype.down = function(){
        return --this[counterSymbol];
    }

    return Spinner;
})();