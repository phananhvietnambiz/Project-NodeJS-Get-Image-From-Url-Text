const fs = require('fs')
var data = ''
const request = require('request')
var readerStream = fs.createReadStream('input.txt');
var currFolder
var nameFolder
var c = 1
const path = require('path')
readerStream.setEncoding('UTF8');

readerStream.on('data', function(chunk) {
  data += chunk
})

readerStream.on('end', function() {

  var lines = data.split`\n`

  for(let line of lines) {
    if(line.includes('https')) {
      let fIndex = line.indexOf('"');
      let lIndex = line.lastIndexOf('"')

      let url = line.slice(fIndex + 1, lIndex)
      request(url).pipe(fs.createWriteStream(currFolder + '/' + nameFolder + c))
      c++
    }
    else {
      currFolder = __dirname + '/' + line
      nameFolder = line
      c = 1
      fs.mkdirSync(currFolder, {recursive: true});
    }
  }

})
