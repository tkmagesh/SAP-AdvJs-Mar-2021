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