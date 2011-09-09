var express = require('express')
   , nowjs = require('now')
   , server = express.createServer()
   , spawn = require('child_process').spawn
   , everyone = nowjs.initialize(server)

/**
 * @param url string
 * @param options { page : { settings : { viewportSize : { ... }, userAgent : { ... } }, 
 *                  toHide : [ "#selector1", ".selector2", ... ] }
 */
everyone.now.screenshot = function (url, options, callback) {
   var client = this.now
      , screenshot = "static/screenshots/"+new Date().getTime()+".png"
   
   console.log('spawning ./phantomjs rasterize.js '+url+' '+screenshot+' '+JSON.stringify(options))
   var phantom = spawn('./phantomjs', ["rasterize.js", url, screenshot, JSON.stringify(options) ])
   phantom.stdout.on('data', function (o) { console.log(o.toString('utf8')) })
   phantom.on('exit', function (e) { callback(e?"/static/error.png":"/"+screenshot) })
}

server.use('/static', express.static(__dirname+'/static/'))
server.get('*', function(req, res) { res.render('index.ejs', {layout:false}) })
server.listen(8888)