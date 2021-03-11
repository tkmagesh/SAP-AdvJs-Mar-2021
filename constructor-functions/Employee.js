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
}