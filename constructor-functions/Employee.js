/* 
Constructor Functions
    invoked using the 'new' keyword
        this -> new object
        this -> returned by default

    Convention : constructor function name should start with upper case letter

 */

function Employee(id, name, salary){
    //this -> new object
    this.id = id;
    this.name = name;
    this.salary = salary;
    //this -> returned by default

    this.display = function(){
        console.log(this.id, this.name, this.salary, this.city);
    };
}

/* OR */

function Employee(id, name, salary){
    //this -> new object
    this.id = id;
    this.name = name;
    this.salary = salary;
    //this -> returned by default
}

Employee.prototype.display = function(){
    console.log(this.id, this.name, this.salary, this.city);
};