var tape = require('tape')
var concat = require('concat-stream')
var tar = require('tar-stream')
var map = require('./')

tape('strip one', function(t) {
  var p = tar.pack()
  var e = tar.extract()

  p.entry({name:'foo/bar'}, 'baz')
  p.finalize()

  var s = map(function(header) {
    header.name = header.name.split('/').slice(1).join('/')
    return header
  })

  e.on('entry', function(header, stream, next) {
    t.same(header.name, 'bar', 'name is stripped')
    stream.pipe(concat(function(data) {
      t.same(data.toString(), 'baz', 'data is not modified')
      next()
    }))
  })

  e.on('finish', function() {
    t.ok(true, 'stream terminates')
    t.end()
  })

  p.pipe(s).pipe(e)
})