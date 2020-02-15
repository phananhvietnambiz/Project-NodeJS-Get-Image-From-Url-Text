var folders = ['photos', 'curves','gradients', 'materials','paints', 'shapes']
var extFolders = ['png', 'svg', 'png', 'png', 'png', 'svg']
var output = ''
var fs = require('fs')


function gen() {
	folders.map((folder, i) => {
		let folder64 = folder + 'thumb64'
		let folder256 = folder + 'thumb256'

			let files = fs.readdirSync(__dirname + '/' + folder)

			for(let name of files) {
				let var1 = `const ${name} = require('../assets/img/campaign/${folder}/${name}.${extFolders[i]}')`
				let var2 = `const ${name}_64 = require('../assets/img/campaign/${folder64}/${name}.${extFolders[i]}')`
				let var3 = `const ${name}_256 = require('../assets/img/campaign/${folder256}/${name}.${extFolders[i]}')`

				output += var1 + '\n' + var2 + '\n' + var3 + '\n'
			}
		})

		output += 'module.exports = {' + '\n'

		folders.map((folder, i) => {
			output += `${folder}: [` + '\n'

			let files = fs.readdirSync(__dirname + '/' + folder)

			for(let name of files) {
				output += `{url: ${name}, thumbnail_256_url: ${name}_256, thumbnail_64_url: ${name}_64},` + '\n'
			}

			output += '],' + '\n'
		})

		output += '}'
}

gen()

// console.log(output)

var writerStream = fs.createWriteStream('output.txt');

//Write the data to stream with encoding to be utf8
writerStream.write(output,'UTF8');
