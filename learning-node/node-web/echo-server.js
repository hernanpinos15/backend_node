const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
    if (req.method === "POST" && req.url == "/echo") {
        let body = [];

        req
            .on("error", (err) => {
                console.error(err);
                console.log("error");
            })
            .on("data", (chunk) => {
                body.push(chunk);
            })
            .on("end", () => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                body = Buffer.concat(body).toString();
                //fecha de nacimiento yyyy/mm/dd
                let date = new Date(body);
                let day = date.getDay();
                let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                res.end(`You were born in the day: '${weekDays[day]}'`);
            });
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8001);
console.log("Servidor en la url http://localhost:8001");