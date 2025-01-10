

const loadash = require("loadash");

const names = ['james', 'max', 'sinclare', 'benjamine'];

const capNames = loadash.map(names, loadash.capitalize);

console.log(capNames);