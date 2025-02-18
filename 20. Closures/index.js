
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
// console.log(bas.bar);
// console.log(qux.bar);

// console.log(module.exports);



// process.nextTick
// process.nextTick is a simple function that takes a callback function. It is used to put the callback into the next cycle
//of the Node.js event loop. 

process.nextTick(function (){
    // console.log('next tick')
});
// console.log('immediate')


// CORE MODULES
// The path module exports functions that provide useful string
// transformations common when working with the file system.
var path = require('path')


// This function fixes up slashes to be OS specific, takes care of . and .. in the path, and also removes duplicate slashes
// path.normalize(str)

// Fixes up .. and .
// logs on Unix: /foo
// logs on Windows: \foo
console.log(path.normalize('/foo/bar/..'));

// Also removes duplicate '//' slashes
// logs on Unix: /foo/bar
// logs on Windows: \foo\bar
console.log(path.normalize('/foo//bar/bas/..'));  //  /foo/bar



//path.join([str1], [str2], …)
// his function joins any number of paths together, taking into account the operating system.

// logs on Unix: foo/bar/bas
// logs on Windows: foo\bar\bas
console.log(path.join('foo', '/bar', 'bas')); //  foo/bar/bas


// dirname, basename, and extname  --->>
// path.dirname gives you the directory portion of a specific path string (OS independent)
// path.basename gives you the name of the file.
// path.extname gives you the file extension

var completePath = '/foo/bar/bas.html';

// Logs : /foo/bar
console.log(path.dirname(completePath));

// Logs : bas.html
console.log(path.basename(completePath));

// Logs : .html
console.log(path.extname(completePath));

// require()
// require caches the result of a require call after the first time

// fs Module
// The fs module provides access to the filesystem. Use require('fs') to load this module. The fs module has
// functions for renaming files, deleting files, reading files, and writing to files.
var fs = require('fs');


// write
fs.writeFileSync('text.txt', 'Hello, fs');

// read
console.log(fs.readFileSync('text.txt').toString())


// delete file synchronous version
try {
    fs.unlinkSync('./text.txt');
    console.log('text.txt successfully deleted');
} catch (err) {
    console.log('Error', err)
};

// delete file Asynchronous version
fs.unlink('./text.txt', function (err){
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('text.txt successfully deleted');
    }
});




// os Module
var os = require('os');
const e = require('express');

// we want to know the current system memory usag
var gigaByte = 1 / (Math.pow(1024, 3));
console.log('Total Memory', os.totalmem() * gigaByte, 'GBs');
console.log('Available Memory', os.freemem() * gigaByte, 'GBs');
console.log('Percent consumed', 100 * (1 - os.freemem() / os.totalmem()));


// number of CPUs available
console.log('This machine has', os.cpus().length, 'CPUs')

// JSON
var fol = {
    a:1, 
    b: 'a string',
    c: true
}

// convert a JavaScript object to a string (JSON string)
var json = JSON.stringify(fol);
console.log(json);
console.log(typeof json); // string

// convert a JSON string to a JavaScript object
var backToJs = JSON.parse(json);
console.log(backToJs);
console.log(backToJs.a); //  1


// underscore package

// Let’s say we have an array of numbers and we only need the ones that are greater than 100.
// var _ = require('underscore');
var foo = [1, 10, 50, 200, 800, 90, 40]

// var result = _.filter(foo, (item) => {
//     return item > 100
// });
// console.log(result)


// The _.map function takes an array, calls a function for each
// element of the array storing the return value as a result, and returns a new array consisting of all the results.
var foo_list = [1, 2, 3, 5]
// var resuls = _.map(foo_list, (item)=> { return item * 2})
// console.log(results)


// is to get all elements except those that match a condition. For this, we can use _.reject
// var odds = _.reject([1, 2, 3, 4, 5, 6, 7], (num) => { return num % 2 == 0})
// console.log(odds)


function getRed(str) {
    // Changes the console foreground to red
    var redCode = '\x1b[31m';
    // Resets the console foreground
    var clearCode = '\x1b[39m';
    return redCode + str + clearCode;
}
// console.log(getRed('Hello World!'));

// Inheritance Pattern
function Animal(name) {
    this.name = name
}

Animal.prototype.walk = function (destination) {
    console.log(this.name, 'is walking to', destination)
}

var animale = new Animal('dog')
animale.walk('bush')


// Event Emitter class

var EventEmmitter = require('events').EventEmitter;

var emitter = new EventEmmitter();

//--> Subscribe
emitter.on('foo', (arg1, arg2) => {
    console.log('Foo raised, Args:', arg1, arg2);
});

// --> Emit
emitter.emit('foo', {a: 123}, {b: 465})

// multiple subscribers
emitter.on('bar', function kid (ev) {
    console.log('Subscriber 1:', ev);
});

emitter.on('bar', function kids (ev) {
    if (ev.handled) {
        console.log('event already handled');
    }
});
// emit
emitter.emit('bar', {handled: true})

// Unsubscribing events
var fooHandler = fooHandler = function() {
    console.log('handler called')

    //unsubscribe
    emitter.removeListener('lis', fooHandler)
};

emitter.on('lis', fooHandler);

emitter.emit('lis');
emitter.emit('lis'); // second event goes unnoticed after we removed the first event

// console.log(emitter.listeners('bar')) // list all the listeners on event -->> debugging



// 
emitter.on('removeListener', function (eventName, listenerFunction){
    console.log(eventName, 'Listner removed', listenerFunction.name);
});
emitter.on('newListener', function (eventName, listenerFunction){
    console.log(eventName, 'Listner added', listenerFunction.name);
});

function a() {}
function b() {}

// Add
emitter.on('fol', a)
emitter.on('fol', b)

//remove
emitter.removeListener('fol', a);
emitter.removeListener('fol', b);

// CREAT A CUSTOM EVENT EMITTERS
var inherits = require('util').inherits;

// Custom class



/// JS - NODE TESTING
// Node.js comes with assert as a core module 
// npm install -g mocha
// The two most important functions in the mocha API are describe and it. 
// The describe function is used to encapsulate a test suite, which is quite simply a collection of tests.
// The it function encapsulates a single test (also called a spec). Both the describe and the it functions take a
// string as a first argument (which is displayed on the console when you run the tests) and a function as a second
// argument (this is the callback executed when mocha runs the test). 
var assert = require('assert');

describe('our test suite', function() {
    it('should pass this test', function () {
        assert.equal(1, 1, '1 should be equal to 1')
    });

    it('should fail this test', function () {
        assert.equal(1, 0, '1 should not be equal to 0')
    })
});

// run the test
// mocha basic.js 

// Mocha API
// The additional mocha API is quite small (simple but powerful).
// It can be categorized into hooks and exclusive testing functions
// Mocha provides hook functions before(), after(), beforeEach(), and afterEach(), which can be used to
// simplify our test setup and teardown significantly.
// All of these functions simply take a callback. This callback is called
// at the correct instant (hook) when in a test suite (a describe callback).

// before: executes the registered callback before it runs the first test (the first it callback)
// after: executes the callback after it runs the last test 
// beforeEach: executes the callback before executing each test 
// afterEach: executes the callback before executing each test  

var assert = require('assert');

describe('our test suite', function () {
    var testExecuting = 0;
    beforeEach(function () {
        testExecuting ++;
    });

    it('test 1', function () {
        assert.equal(1, 1, 'This should be test1');
    });

    it('test 2', function () {
        assert.equal(2, 2, 'This should be test 2')
    });
});


// Single Test Runs and Exclusions
// The describe and the it functions both have member functions skip and only
// describe.only:  If you only want to run one test suite (describe) while you are working on large sets of specs,

describe.only('first', function () {
    it('test 1', function () {});
});

describe('second', function () {
    it('test 1', function () {});
});


//Skip 

describe('first', function () {
    it('test 1', function () {
    });
});


describe.skip('second', function () {
    it('test 1', function () {
    });
});












