var express = require('express')
   , nowjs = require('now')
   , server = express.createServer()
   , spawn = require('child_process').spawn
   , everyone = nowjs.initialize(server)

var phantomProcess = 5

/**
 * @param url string
 * @param options { page : { settings : { viewportSize : { ... }, userAgent : { ... } }, 
 *                  hide : [ "#selector1", ".selector2", ... ] }
 */
everyone.now.screenshot = function (url, options, callback) {
   var client = this.now
      , screenshot = "static/screenshots/"+new Date().getTime()+".png";
   
   (function () {
      if (phantomProcess == 0) {
         console.log('waiting...')
         return setTimeout(arguments.callee, 1000)
      }
      --phantomProcess
      console.log('spawning ./phantomjs rasterize.js '+url+' '+screenshot+' '+JSON.stringify(options))
      var phantom = spawn('./phantomjs', ["rasterize.js", url, screenshot, JSON.stringify(options) ])
      phantom.stdout.on('data', function (o) { console.log(o.toString('utf8')) })
      phantom.on('exit', function (e) {
         callback(e?"/static/error.png":"/"+screenshot)
         ++phantomProcess
      })
   })()
}

server.use('/static', express.static(__dirname+'/static/'))
server.get('*', function(req, res) { res.render('index.ejs', {layout:false}) })
server.listen(8888)