const http = require('http')


const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Helloo node js from http module");
})


const port = 8000
server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});