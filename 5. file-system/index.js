const fs = require('fs')  //fs - file system
const path = require('path');


const dataFolder = path.join(__dirname, 'data');

if (!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log('data folder created')
}

// sync way of creating the file
const filePath = path.join(dataFolder, 'example.txt')
fs.writeFileSync(filePath, 'Hello we create this file successfully')


const readContentFromFile = fs.readFileSync(filePath, 'utf8')
console.log('File content:', readContentFromFile)

//append new line to file
fs.appendFileSync(filePath, '\nThis is a new line to that file')




