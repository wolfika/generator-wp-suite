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
        _props.plugin = {
          name: {
            human: props.pluginName,
            fileName: slug(props.pluginName, {
              lower: true
            }),
            className: slug(props.pluginName, {
              lower: false,
              replacement: '_'
            }),
            instanceName: slug(props.pluginName, {
              lower: true,
              replacement: '_'
            })
          },
          author: {
            name: props.authorName,
            email: props.authorEmail,
            website: humanizeUrl(props.authorWebsite)
          },
          description: props.pluginDescription,
          website: humanizeUrl(props.pluginWebsite),
          hasAdmin: props.hasAdmin
        };
      });
  },

  writing() {
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), _props);
  }
});
