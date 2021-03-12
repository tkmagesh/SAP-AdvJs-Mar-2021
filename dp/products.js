var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'}
];

/* 
1. sorting
2. filtering
3. grouping
*/

function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

describe('Default list of products', function(){
    console.table(products);
});


describe('Sorting', function(){
    describe('Products By Id', function(){
        function sortProductsById(){
            for(var i=0; i< products.length-1; i++)
                for(var j=i+1; j< products.length; j++){
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
                }
        }
        sortProductsById();
        console.table(products);
    });
    describe('Any list by any attribute', function(){
        function sort(list, attrName){
            for(var i=0; i< list.length-1; i++)
                for(var j=i+1; j< list.length; j++){
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
                }
        }
        describe('Products by cost', function(){
            sort(products, 'cost');
            console.table(products);
        });
        describe('Products by units', function(){
            sort(products, 'units');
            console.table(products);
        });
    });

    describe('Any list by any comparer', function(){
        function sort(list, comparerFn){
            for(var i=0; i< list.length-1; i++)
                for(var j=i+1; j< list.length; j++){
                    if ( comparerFn(list[i], list[j]) > 0 ){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
                }
        }

        describe('Products by value [cost * units]', function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value > p2Value) return 1;
                return 0;
            }
            sort(products, productComparerByValue);
            console.table(products);
        })
    });

    describe('Any list by either attr or comparer', function(){
        function sort(list, param){
            function getComparer(attrName){
                return function(p1, p2){
                    if (p1[attrName] < p2[attrName]) return -1;
                    if (p1[attrName] > p2[attrName]) return 1;
                    return 0;
                }
            }
            var comparerFn = typeof param === 'function' ? param : getComparer(param);
            for(var i=0; i< list.length-1; i++)
                for(var j=i+1; j< list.length; j++){
                    if ( comparerFn(list[i], list[j]) > 0 ){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
                }
        }

        describe('Products by category [attr]', function(){
            sort(products, 'category');
            console.table(products);
        });

        describe('products by value [cost * units]', function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value > p2Value) return 1;
                return 0;
            }
            sort(products, productComparerByValue);
            console.table(products);
        });
    });
});

describe('Filter', function(){
    describe('Filtering stationary products', function(){
        function filterStationaryProducts(){
            var result = [];
            for(var index = 0, count = products.length; index < count; index++)
                if (products[index].category === 'stationary')
                    result.push(products[index]);
            return result;
        }

        var stationaryProducts = filterStationaryProducts();
        console.table(stationaryProducts);
    });
})