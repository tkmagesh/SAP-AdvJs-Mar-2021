/*
pure functions
    When a functions invocation can be replaced with the result of the function
*/



function memoize(fn){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (!cache.hasOwnProperty(key))
            cache[key] = fn.apply(this, arguments);
        return cache[key];
    }
}

var add = memoize(function add(x,y){
    console.log('processing ', x , ' and ', y);
    return x + y;
});