const http = require('http');
const hostname = 'localhost';
const port = 3000;

const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method !== 'GET') return notSupportGet();

    let fileUrl = renderFileUrl();
    let filePath = renderFilePath();

    if (checkFileType() !== '.html') return FourZeroFour();
    if (!checkExist()) return FourZeroFour();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // noinspection JSUnresolvedFunction
    fs.createReadStream(filePath).pipe(res);

    function renderFileUrl() {
        return req.url === '/' ? '/index.html' : req.url;
    }

    function renderFilePath() {
        return path.resolve('./public' + fileUrl);
    }

    function checkExist() {
        return fs.existsSync(filePath);
    }

    function checkFileType() {
        return path.extname(filePath);
    }

    function notSupportGet() {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method +
            ' not supported</h1></body></html>');
    }

    function FourZeroFour() {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl +
            ' not a HTML file</h1></body></html>'
        );
    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
