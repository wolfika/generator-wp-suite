# WP Suite [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Easily generate WordPress themes, plugins, and more.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wp-suite using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-wp-suite
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

##### Separate admin and public functionality?

When developing simple plugins, I saw that most of the time, I didn't even need like 50% of the plugin boilerplate, and always started plugin development by deleting the admin and public folders, and any references to them. The generator takes away the pain of doing this manually. If you choose **yes**, the plugin is **going to** create the `admin` and `public` folders. If you choose **no**, then **it will not**.

##### Does your plugin need a composer.json?

Maybe your plugin relies on some dependency that can be downloaded via composer. By choosing **yes** a `composer.json` will be generated.

##### Would you like to use Composer's autoloader?

It's generally a good idea to manage your dependencies with a dedicated dependency manager tool, [Composer] is one of those, probably the most popular for PHP-based projects today. Root's [Bedrock] stack uses Composer by default. If you choose **yes**, the plugin is going to require Composer's autoloader file in the plugin's main file (`./your-plugin-name.php`), and all your dependencies' classes are going to be available in for use in your plugin. It uses the `require_once` language construct to achieve this, making sure that the autoloader only gets included once per request. By default, it's going to look for the autoloader file in the WordPress project root directory's `vendor` folder. So, in order to have it working, you  should have a file structure like this:

```
.
+-- vendor
+-- wp-admin
+-- wp-content
|   +-- mu-plugins
|   +-- plugins
|   |   +-- your-plugin-name
|   +-- themes
|   +-- index.php
+-- wp-includes
+-- composer.json
+-- composer.lock
+-- ...
```

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
