var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'},
    {id : 7, name : 'Mouse', cost : 100, units : 20, category : 'electronics'}
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

        function getDescComparer(comparer){
            return function(){
                return comparer.apply(this, arguments) * -1;
            }
        }

        describe('Products by category [attr]', function(){
            sort(products, 'category');
            console.table(products);
        });

        var productComparerByValue = function(p1, p2){
            var p1Value = p1.cost * p1.units,
                p2Value = p2.cost * p2.units;
            if (p1Value < p2Value) return -1;
            if (p1Value > p2Value) return 1;
            return 0;
        };
        describe('products by value [cost * units]', function(){
            sort(products, productComparerByValue);
            console.table(products);
        });
        describe('products by value [cost * units] descending', function(){
            var productComparerByValueDesc = getDescComparer(productComparerByValue);
            sort(products, productComparerByValueDesc);
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

    describe('Any list by any criteria', function(){
        function filter(list, predicate){
            var result = [];
            for(var index = 0, count = list.length; index < count; index++)
                if (predicate(list[index]))
                    result.push(list[index]);
            return result;
        }

        function negate(predicateFn){
            return function(){
                return !predicateFn.apply(this, arguments)
            };
        }

        describe('filter stationary products', function(){
            var stationaryProductPredicate = function(p){
                return p.category === 'stationary';
            };
            var stationaryProducts = filter(products, stationaryProductPredicate);
            console.table(stationaryProducts);
        })

        describe('filter products by cost', function(){
            var costlyProductPredicate = function(product){
                return product.cost > 50;
            };
            describe('costly products [cost > 50]', function(){
                var costlyProducts = filter(products, costlyProductPredicate);
                console.table(costlyProducts);
            });
            describe('affordable products [!costly product]', function(){
                /* var affordableProductPredicate = function(product){
                    return !costlyProductPredicate(product);
                }; */
                var affordableProductPredicate = negate(costlyProductPredicate);
                var affordableProducts = filter(products,affordableProductPredicate);
                console.table(affordableProducts);
            })
        })

        describe('filter products by units', function(){
            var understockedProductPredicate = function(product){
                return product.units <= 30;
            };
            describe('understocked products [units <= 30]', function(){
                var understockedProducts = filter(products, understockedProductPredicate);
                console.table(understockedProducts);
            });
            describe('wellstocked products [!understocked products]', function(){
                /* var wellStockedProductPredicate = function(product){
                    return !understockedProductPredicate(product);
                }; */
                var wellStockedProductPredicate = negate(understockedProductPredicate);
                var wellstockedProducts = filter(products, wellStockedProductPredicate);
                console.table(wellstockedProducts);
            })
        })
        
    })
});

describe('Group', function(){
    describe('products by category', function(){
        function groupProductsByCategory(){
            var groupedProducts = {};
            for(var index=0, count = products.length; index < count; index++){
                var product = products[index];
                /* if (typeof groupedProducts[product.category] === 'undefined')
                    groupedProducts[product.category] = []; */
                groupedProducts[product.category] = groupedProducts[product.category] || [];
                groupedProducts[product.category].push(product);
            }
            return groupedProducts;
        }
        var productsByCategory = groupProductsByCategory();
        console.log(productsByCategory);
    });
})

/* 
A || B => if A is truthy then A is returned else B is returned
If the boolean equivalent of a value is true then the value is called 'truthy'
If the boolean equivalent of a value is false then the value is called 'falsy'
*/