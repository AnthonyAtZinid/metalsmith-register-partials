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
			// TODO: Pass in file pattern for partials finding & use in template naming?
			const pattern = `${options.directory}/**/*.html.handlebars`
			if (multimatch(filename, pattern).length) {
				// TODO: Get rid of these replace hacks
				const templateName = filename
					.replace('.html', '')
					.replace('.handlebars', '')
					.replace('partials/', '')
				const templateContents = file.contents.toString()
				handlebars.registerPartial(templateName, templateContents)
			}
		})

		done()
	}
}

module.exports = plugin
