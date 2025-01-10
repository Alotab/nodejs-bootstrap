const EventEmitter = require('events');

class MyCustomEmitter extends EventEmitter{
    constructor(){
        super();
        this.greeting = 'Hello, in constructor'
    }

    greet(name) {
        this.emit('greeting', `${this.greeting}, ${name}`)
    }

    sex(male, female) {
        this.emit('foreplay', `${male} is about to play with ${female}`)
    }
}

const myCustomerEmitter = new MyCustomEmitter();

myCustomerEmitter.on('greeting', (input) => {
    console.log('Greeting event', input)
});

myCustomerEmitter.on('foreplay', (input) => {
    console.log('Sex event:', input)
});

myCustomerEmitter.greet('John');
myCustomerEmitter.sex('Mike','Jenny');