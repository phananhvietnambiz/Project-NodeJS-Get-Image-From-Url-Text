var readline = require('linebyline'),
rl = readline('./input.txt');
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs')
var path = require('path')

var folders = ['photos', 'curves','gradients', 'materials','paints', 'shapes']
var extFolders = ['png', 'svg', 'png', 'png', 'png', 'svg']

function thumb(size) {
  folders.map((folder,i) => {

    let nameFolder = folder + 'thumb' + size
    fs.mkdirSync(__dirname + '/' + nameFolder, {recursive: true})

    fs.readdir(__dirname + '/' + folder, function(err, files) {
      files.map(name => {
        let path = __dirname + '/' + folder + '/' + name
        let newName =  __dirname + '/' + nameFolder + '/' + name + '.' + extFolders[i]

        let writeStream = fs.createWriteStream(newName);
        gm(path)
        .resize(size, size)
        .stream()
        .pipe(writeStream);
      })
    })
  })
}
thumb(64)
thumb(256)

