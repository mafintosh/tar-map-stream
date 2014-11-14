var tar = require('tar-stream')
var duplexify = require('duplexify')
var pump = require('pump')

module.exports = function(map) {
  var pack = tar.pack()
  var extract = tar.extract()

  extract.on('entry', function(header, stream, next) {
    header = map(header)
    if (header) return pump(stream, pack.entry(header), next)
    stream.resume()
    next()
  })

  extract.on('finish', function() {
    pack.finalize()
  })

  return duplexify(extract, pack)
}