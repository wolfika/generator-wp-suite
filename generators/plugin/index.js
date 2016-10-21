'use strict';
const yeoman = require('yeoman-generator');
const slug = require('mollusc');
const normalizeUrl = require('normalize-url');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const availableFeatures = require('./features');

let _props = {};

_props.util = {};

_props.util.hasAdminOrPublic = function hasAdminOrPublic() {
  return ['adminFunctionality', 'publicFunctionality'].some(function (v) {
    return _props.plugin.featureList.indexOf(v) >= 0;
  });
};

_props.util.hasAdmin = function hasAdmin() {
  return _props.plugin.featureList.indexOf('adminFunctionality') >= 0;
};

_props.util.hasPublic = function hasPublic() {
  return _props.plugin.featureList.indexOf('publicFunctionality') >= 0;
};

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
      name: 'featureList',
      message: 'Please check the features you want to include in your plugin',
      type: 'checkbox',
      choices: availableFeatures
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
          featureList: props.featureList
        };
      });
  },

  writing() {
    const filters = [];

    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    };

    const adminFiles = _props.plugin.featureList.includes('adminFunctionality') ? `${this.templatePath()}/admin/**/*` : `!${this.templatePath()}/admin/**/*`;
    const publicFiles = _props.plugin.featureList.includes('publicFunctionality') ? `${this.templatePath()}/public/**/*` : `!${this.templatePath()}/public/**/*`;
    const activationFiles = _props.plugin.featureList.includes('usesActivation') ? `${this.templatePath()}/includes/*-?(de)activator.php` : `!${this.templatePath()}/includes/*-?(de)activator.php`;
    const nodeModules = `!${this.templatePath()}/node_modules/**/*`;
    const composerFile = _props.plugin.featureList.includes('composer') ? `${this.templatePath()}/composer.json` : `!${this.templatePath()}/composer.json`;

    const templateFilter = filter('**/*', {restore: true});

    filters.push(templateFilter);
    filters.push(rename(filePath => {
      filePath.basename = filePath.basename.replace('plugin-name', _props.plugin.name.fileName);
    }));
    filters.push(templateFilter.restore);

    this.registerTransformStream(filters);

    try {
      this.fs.copyTpl([`${this.templatePath()}/**/*`, adminFiles, publicFiles, activationFiles, nodeModules, composerFile], this.destinationPath(), _props);
    } catch (ex) {
      console.log(ex);
    }

    mv('editorconfig', '.editorconfig');
    mv('gitattributes', '.gitattributes');
    mv('gitignore', '.gitignore');
  }
});
