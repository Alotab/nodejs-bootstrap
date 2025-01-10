const http = require("http")

const server =  http.createServer((req, res) => {
    console.log(req.url);
    const url = req.url;
    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain"});
        res.end("Home page")
    } else if (url === "/project") {
        res.writeHead(200, { "Content-Type": "text/plain"});
        res.end("Projects")
    } else {
        res.writeHead(404, { "Content-Type": "text/plain"});
        res.end("This page is not found")
    }
})

const port = 3000
server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});