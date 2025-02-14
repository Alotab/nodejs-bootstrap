
// The variables in the outer function have been closed by (or bound in) the inner function. Hence the term
// closure. The concept in itself is simple enough and fairly intuitive.

function outerfunc(arg) {
    var innerVar = arg

    function innerfunc(){
        console.log(innerVar)
    }

    innerfunc();
}
// outerfunc('Hello, Closure')


function longRuningOpe(callback){
    // simulate a 3 second operation
    setTimeout(callback, 3000)
}

function webRequest(request){
    console.log('Starting a long operation for request:', request)
    longRuningOpe(function () {
        console.log('ending a long operation for request:', request)
    });
}

// webRequest({id: 1})


// console.time('timeit')
function fib(n) {
    if (n < 2)
        return 1;
    else
        return fib(n -2) + fib(n -1)
}


// console.time('timeit')
// setTimeout(function () {
//     console.timeEnd('timer')
// }, 1000);

// fib(44);


function printtableMessage(){
    var message = 'hello'
    function setMessage(newMessage){
        if (!newMessage) throw new Error('Cannot set empty message')
            message = newMessage
    }

    function getMessage(){
        return message
    }

    function printMessage(){
        console.log(message)
    }

    return {
        setMessage: setMessage,
        getMessage: getMessage,
        printMessage: printMessage
    };
}


//pattern in use
var awesome1 = printtableMessage();
awesome1.printMessage(); //hello

var awesome2 = printtableMessage();
awesome2.setMessage('hi');
awesome2.printMessage() //hi

// since we get a new object everytime we call module function
// awesome1 is unaffected by awesome2
awesome1.printMessage(); //hi


// THIS
function fooo() {
    console.log('is this called from globals? : ', this === global); // true
}
// fooo()


// PROTOTYPE
// Lets create a test function and set a member on its prototype
function foo() { };
foo.prototype.bar = 123;

// Lets create a object using `new`
// foo.prototype will be copied to bas.__proto__
var bas = new foo();

// Verify the prototype has been copied
console.log(bas.__proto__ === foo.prototype); // true
console.log(bas.bar); // 123


function foos(){};
foos.prototype.bar = 123;

//create two instances
var bas = new foos();
var qux = new foos();

//show original value
console.log(bas.bar);
console.log(qux.bar);
