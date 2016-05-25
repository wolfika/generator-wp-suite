'use strict';
const yeoman = require('yeoman-generator');
const slug = require('slug');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');

let _props = {};

module.exports = yeoman.Base.extend({
  prompting() {
    const prompts = [{
      name: 'pluginName',
      message: 'What do you want to name your plugin?'
    }, {
      name: 'pluginDescription',
      message: 'What does your plugin do?'
    }, {
      name: 'pluginWebsite',
      message: 'What is the URL of the plugin\'s website?',
      validate: x => x.length > 0 ? true : 'You have to provide a website URL',
      filter: x => normalizeUrl(x)
    }, {
      name: 'authorName',
      message: 'What is your name?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a name'
    }, {
      name: 'authorEmail',
      message: 'What is your email?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide an email'
    }, {
      name: 'authorWebsite',
      message: 'What is the URL of your website?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a website URL',
      filter: x => normalizeUrl(x)
    }, {
      name: 'hasAdmin',
      message: 'Do you need admin-specific functionality?',
      type: 'confirm',
      default: false
    }];

    return this.prompt(prompts)
      .then(props => {
        _props.pluginName = props.pluginName;
        _props.pluginSlugKebabCase = slug(props.pluginName, {
          lower: true
        });
        _props.pluginSlugSnakeCase = slug(props.pluginName, {
          lower: false,
          replacement: '_'
        });
        _props.pluginWebsite = humanizeUrl(props.pluginWebsite);
        _props.authorName = props.authorName;
        _props.authorEmail = props.authorEmail;
        _props.authorWebsite = humanizeUrl(props.authorWebsite);
        _props.hasAdmin = props.hasAdmin;
      });
  },

  writing() {
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), _props);
  }
});
