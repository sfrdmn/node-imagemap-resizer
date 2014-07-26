var http = require('http')
var url = require('url')
var send = require('send')
var port = 8000

console.log('Server listening on port ' + port)

http.createServer(function(req, res) {
  send(req, url.parse(req.url).pathname, {root: __dirname})
      .on('error', function(err) {
        res.statusCode = err.status || 500
        res.end(err.message)
        console.error('Error: ' + err.message)
      })
      .pipe(res)
}).listen(port)
