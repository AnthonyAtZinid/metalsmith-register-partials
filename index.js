/* eslint-disable no-sync */
const extend = require('extend')
const handlebars = require('handlebars')
const multimatch = require('multimatch')
const _ = require('lodash')

function plugin(ops) {
	const options = extend({
		directory: 'partials'
	}, ops || {})

	return function(files, metalsmith, done) {
		_.forEach(files, (file, filename) => {
			const pattern = `${options.directory}/**/*${options.suffix}`
			if (multimatch(filename, pattern).length) {
				const templateName = filename
					.replace(new RegExp(`${options.suffix}$`), '')
					.replace(new RegExp(`^${options.directory}/`), '')
				const templateContents = file.contents.toString()
				handlebars.registerPartial(templateName, templateContents)
			}
		})

		done()
	}
}

module.exports = plugin
