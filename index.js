/* eslint-disable no-sync */
const extend = require('extend')
const handlebars = require('handlebars')
const multimatch = require('multimatch')
const _ = require('lodash')

function plugin(ops) {
	const options = extend({
		directory: 'partials'
	}, ops || {})

	return function(metalsmithFiles, metalsmith, done) {
		_.forEach(metalsmithFiles, (metalsmithFile, metalsmithFilename) => {
			// TODO: Pass in file pattern for partials finding & use in template naming?
			const pattern = `${options.directory}/**/*.html.handlebars`
			if (multimatch(metalsmithFilename, pattern).length) {
				// TODO: Get rid of these replace hacks
				const templateName = metalsmithFilename
					.replace('.html', '')
					.replace('.handlebars', '')
					.replace('partials/', '')
				const templateContents = metalsmithFile.contents.toString()
				handlebars.registerPartial(templateName, templateContents)
			}
		})

		done()
	}
}

module.exports = plugin
