# metalsmith-register-partials

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

A Metalsmith plugin for registering Handlebars partials.

## CLI Usage

Install via `npm i AnthonyAtZinid/metalsmith-register-partials` then add the `metalsmith-register-partials` key to your `metalsmith.json` plugins, something like so:

```
{
  "plugins": {
    "metalsmith-register-partials": {
      "directory": "partials"
	  "suffix": ".html"
    }
  }
}
```

This will register all files with the suffix `.html` in the directory `partials` (relative to your source) and use the path after `partials` and entire filename minus `.html` as the partial name.

Works for files in subfolders

Works in a metalsmith pipeline

## License

MIT, see [LICENSE.md](http://github.com/linclark/metalsmith-register-partials/blob/master/LICENSE.md) for details.
