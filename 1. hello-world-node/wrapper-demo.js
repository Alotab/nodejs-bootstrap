

console.log("__filename in wrapper demo", __filename);
console.log("__dirname in wrapper exploerer", __dirname);

module.exports.greet = function (name) {
    console.log(`Hello ${name}`)
}