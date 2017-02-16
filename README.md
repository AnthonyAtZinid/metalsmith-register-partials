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
	  "suffix": ".html.handlebars"
    }
  }
}
```

This will register all files sith the suffic .html in the specified directory (relative to your source) and use the first part of the filename as the partial name.

## License

MIT, see [LICENSE.md](http://github.com/linclark/metalsmith-register-partials/blob/master/LICENSE.md) for details.
