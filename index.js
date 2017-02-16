/* eslint-disable no-sync */
const extend = require('extend')
const fs = require('fs')
const handlebars = require('handlebars')
const _ = require('lodash')

function plugin(ops) {
	const options = extend({
		directory: 'partials'
	}, ops || {})

	function registerAllIn(basePath, subPath, metalsmith, done) {
		const actualPath = `${basePath}${subPath}`
		fs.readdir(metalsmith.path(actualPath), (err, redFiles) => {
			if (err) {
				throw err
			}

			_.forEach(redFiles, (file) => {
				// Hack: Remove .html & .handlebar suffixes
				const templateName = subPath + file
					.replace('.html', '')
					.replace('.handlebars', '')

				const path = metalsmith.path(actualPath, file)
				if (fs.lstatSync(path).isDirectory()) {
					// Go deeper
					registerAllIn(basePath, `${subPath}${file}/`, metalsmith)
				} else {
					const partialContents = fs.readFileSync(path).toString('utf8')
					handlebars.registerPartial(templateName, partialContents)
				}
			})

			// Only done on final recursion
			if (done) {
				done()
			}
		})
	}

	return function(metalsmithFiles, metalsmith, done) {
		registerAllIn(`${options.directory}/`, '', metalsmith, done)
	}
}

module.exports = plugin
