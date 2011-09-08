Web-Diff
========

Try it on [http://locuspokus.com:8888/](http://locuspokus.com:8888/)

Experiment
----------

Drag&Drop a json configuration file [example](https://raw.github.com/syndr0m/WDiff/master/static/examples/google.json) on it, or enter it manually

Screenshot :

``` js
[
   {
      "url" :  "http://www.google.com"
   }
]
```

Multiple screenshots :

``` js
[
   {
      "url" :  "http://www.google.com"
   },
   {
      "url" : "http://news.google.com"
   }
]
```

Screenshot with options :

``` js
[
   {
      "url" :  "http://www.google.com",
      "options" : { "toHide" : [ "input[type=submit]" ] }
   }
]
```

WDiff (1 difference) :

``` js
[
   [
      {
         "url" :  "http://www.google.com"
      },
      {
         "url" : "http://www.google.com",
         "options" : { "toHide" : [ "input[type=submit]" ] }
      }
   ]
]
```

Multiple WDiff (1 similar, 1 difference) :

``` js
[
   [
      {
         "url" :  "http://www.google.com"
      },
      {
         "url" :  "http://www.google.com"
      }
   ],
   [
      {
         "url" :  "http://www.google.com"
      },
      {
         "url" : "http://www.google.com",
         "options" : { "toHide" : [ "input[type=submit]" ] }
      }
   ]
]
```

Install / Dependency
--------------------

[nodejs](http://nodejs.org/), [expresjs](http://expressjs.com/), ejs, [nowjs](http://nowjs.org/), [phantomjs](www.phantomjs.org/)

first, [install nodejs](https://github.com/joyent/node/wiki/Installation), then [install npm](http://npmjs.org/) &amp; do : npm install now express ejs

/!\ phantomjs requires X, so if you have no screen/inputs, you can use xvfb (thanks [@neonux](https://github.com/neonux))

Xvfb :1 &
export DISPLAY=:1
node server.js

License
-------

(The MIT License)

Copyright (c) 2011 by &lt;dassonneville@lemonde.fr&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
