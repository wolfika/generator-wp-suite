'use strict';
const yeoman = require('yeoman-generator');
const slug = require('mollusc');
const normalizeUrl = require('normalize-url');
const filter = require('gulp-filter');
const rename = require('gulp-rename');

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
      name: 'isSeparated',
      message: 'Separate admin and public functionality?',
      type: 'confirm',
      default: false
    }, {
      name: 'usesComposer',
      message: 'Does your plugin need a composer.json?',
      type: 'confirm',
      default: false
    }, {
      name: 'usesAutoloader',
      message: 'Would you like to use Composer\'s autoloader?',
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
            website: props.authorWebsite
          },
          description: props.pluginDescription,
          website: props.pluginWebsite,
          isSeparated: props.isSeparated,
          usesComposer: props.usesComposer,
          usesAutoloader: props.usesAutoloader
        };
      });
  },

  writing() {
    const filters = [];

    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    };

    const adminFiles = _props.plugin.isSeparated ? `${this.templatePath()}/admin/**/*` : `!${this.templatePath()}/admin/**/*`;
    const publicFiles = _props.plugin.isSeparated ? `${this.templatePath()}/public/**/*` : `!${this.templatePath()}/public/**/*`;
    const nodeModules = `!${this.templatePath()}/node_modules/**/*`;
    const composerFile = _props.plugin.usesComposer ? `${this.templatePath()}/composer.json` : `!${this.templatePath()}/composer.json`;

    const templateFilter = filter('**/*', {restore: true});

    filters.push(templateFilter);
    filters.push(rename(filePath => {
      filePath.basename = filePath.basename.replace('plugin-name', _props.plugin.name.fileName);
    }));
    filters.push(templateFilter.restore);

    this.registerTransformStream(filters);

    this.fs.copyTpl([`${this.templatePath()}/**/*`, adminFiles, publicFiles, nodeModules, composerFile], this.destinationPath(), _props);

    mv('editorconfig', '.editorconfig');
    mv('gitattributes', '.gitattributes');
    mv('gitignore', '.gitignore');
  }
});
