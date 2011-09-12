var page = new WebPage(),
    address, output, size, options

// no destructuring assignments ?
address = phantom.args[0]
output = phantom.args[1]
options = phantom.args[2]

console.log("PhantomJS: \n\
  adress =" + address + "\n\
  output =" + output  + "\n\
  options=" + options +" \n")

// 
options = JSON.parse(options)
options = options || { }, options.page = options.page || { }

// configuration
page.viewportSize = options.page.viewportSize || { width: 800, height: 600 };
for (s in options.page.settings) {
   page.settings[s] = options.page.settings[s]
}


// tricky part.
// we can't pass parameters to evaluate.
var inject = function (func, options) {
   var wrapped = "page.evaluate(function () { \
      var options = "+JSON.stringify(options)+"; \
      ("+String(func)+")();\
   })";
   eval(wrapped)
}

//
page.open(address, function (status) {
   if (status !== 'success') {
      console.log('Unable to load the address!');
      phantom.exit(1);
   } else {
      window.setTimeout(function () {
         // 
         if (options.hide) {
            inject(function () {
               options.hide.forEach(function (selector) {
                  var l = document.querySelectorAll(selector)
                  for (var i = 0; i < l.length; ++i)
                     l[i].style.display = "none"
               })
            }, options);
         }
         //
         if (options.eval) {
            inject(function () {
               eval(options.eval)
            }, options);
         }
         // 
         page.render(output);
         phantom.exit();
      }, options.delay || 200);
   }
});