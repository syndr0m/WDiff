var express = require('express')
   , nowjs = require('now')
   , server = express.createServer()
   , spawn = require('child_process').spawn
   , everyone = nowjs.initialize(server)

// now
everyone.now.screenshot = function (url) {
   var client = this.now
   var screenshot = "static/screenshots/"+new Date().getTime()+".png"
   var phantom = spawn('./phantomjs', ["rasterize.js", url, screenshot ])
   phantom.on('exit', function () {
      client.display_screenshot(url, "/"+screenshot)
   })
}

server.use('/static', express.static(__dirname+'/static/'))
server.get('*', function(req, res) { res.render('index.ejs', {layout:false}) })
server.listen(8888)