const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  let filename = "." + req.url;

  if (req.method === 'POST') {
    if (req.url === '/players.html') {
      let body = [];

      req.on('error', (err) => {
        console.error(err);
      }).on('data', (data) => {
        body += data;
      }).on('end', () => {
        let formData = qs.parse(body);
        console.log(formData);
      });

    }
  };

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
}).listen(8080);
