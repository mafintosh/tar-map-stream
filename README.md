# tar-map-stream

Streaming mapping of tarball headers

```
npm install tar-map-stream
```

## Usage

``` js
var map = require('tar-map-stream')

// map returns a duplex stream
var stream = map(function(header) {
  // this function is run on every tar header
  // strip one level
  header.name = header.name.split('/').slice(1).join('/')

  // return null to remove this file from the tarball
  // or return the modified header
  return header
})

fs.createReadStream('archive.tar')
  .pipe(stream)
  .pipe(fs.createWriteStream('stripped-archive.tar'))
```

## License

MIT
