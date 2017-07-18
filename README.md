# WP Suite [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Easily generate WordPress themes, plugins, and more.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wp-suite using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-wp-suite
```

Then generate your new project:

```bash
yo wp-suite
```

## Generators

### Theme (main)

```bash
yo wp-suite
```

*Not yet implemented.*

### Plugin

```bash
yo wp-suite:plugin
```

Generates a plugin based on the [WordPress Plugin Boilerplate](https://github.com/DevinVinson/WordPress-Plugin-Boilerplate), with some slight modifications.

#### Options

##### What do you want to name your plugin?

The human-readable name of the plugin, which is going to be displayed in the WordPress admin area. For example: `Mycompany Foo Bar`. The plugin's slug, classnames, and filenames are generated from this, by slugifying the human-readable plugin name. Currently there's neither option nor real need to be able to input these separately, 99% of the time these are all a slugified version of the plugin name, and it should kept that way in order to maintain consistency.

##### What does your plugin do?

Short description of your plugin, which appears in the admin area.

##### What is the URL of the plugin's website?

The website of your plugin, if any.

##### What is your name?

The plugin author's name.

##### What is your email?

The plugin author's email.

##### What is the URL of your website?

The plugin author's website.

#### Feature list

Here the generator shows you a list of available features which you can choose to support in your plugin. These features currently include:

* Composer support (includes autoloader in your plugin, and generates `composer.json` with type `wordpress-plugin`)
* Public-facing/admin-facing functionality (e.g. option pages, page sections, other visual elements that appear on the frontend)
* Activation/deactivation hooks

## License

MIT © [wolfika](https://github.com/wolfika)


[npm-image]: https://badge.fury.io/js/generator-wp-suite.svg
[npm-url]: https://npmjs.org/package/generator-wp-suite
[travis-image]: https://travis-ci.org/wolfika/generator-wp-suite.svg?branch=master
[travis-url]: https://travis-ci.org/wolfika/generator-wp-suite
[daviddm-image]: https://david-dm.org/wolfika/generator-wp-suite.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/wolfika/generator-wp-suite
[coveralls-image]: https://coveralls.io/repos/wolfika/generator-wp-suite/badge.svg
[coveralls-url]: https://coveralls.io/r/wolfika/generator-wp-suite
[wppb]: https://github.com/DevinVinson/WordPress-Plugin-Boilerplate
[composer]: https://getcomposer.org/
[bedrock]: https://github.com/roots/bedrock
