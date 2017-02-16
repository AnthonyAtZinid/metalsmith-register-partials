/* eslint-disable no-sync */
const extend = require('extend')
const fs = require('fs')
const handlebars = require('handlebars')
const _ = require('lodash')

function plugin(ops) {
	const options = extend({
		directory: 'partials'
	}, ops || {})

	return function(metalsmithFiles, metalsmith, done) {
		fs.readdir(metalsmith.path(options.directory), (err, redFiles) => {
			if (err) {
				throw err
			}

			_.forEach(redFiles, (file) => {
				const templateName = file.replace('.html', '').replace('.handlebars', '')
				const path = metalsmith.path(options.directory, file)
				const partialContents = fs.readFileSync(path).toString('utf8')
				handlebars.registerPartial(templateName, partialContents)
			})

			done()
		})
	}
}

module.exports = plugin
