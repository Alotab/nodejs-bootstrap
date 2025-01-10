const { resolve } = require("path");

function delayFn(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

async function delayedGreet(name) {
    await delayFn(2000);
    console.log(name)
}

delayedGreet('John');

async function deivision(num1, num2) {
    try{
        if (num2 === 0) throw new Error('Cant not divide by 0')
            return num1/num2;
    } catch(error) {
        console.log('error', error)
        return null
    }
}


async function main() {
    console.log(await deivision(882, 6));
    console.log(await deivision(882, 0));
}
main();