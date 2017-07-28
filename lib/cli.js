#!/usr/bin/env node
'use strict';

const fs        = require('fs'),
      path      = require('path'),
      colors    = require('colors'),
      inquirer  = require('inquirer'),
      promisify = require('util').promisify,
      ncp       = promisify(require('ncp')),
      writeFile = promisify(fs.writeFile);

const copyBoilerplate = async config => {
  const { type, name, desc } = config,
        boilerplate = path.resolve(__dirname, '../boilerplate/', type),
        destination = path.resolve(process.cwd());
  await ncp(boilerplate, destination);

  const packageJSON = path.resolve(destination, 'package.json');
  await updatePackageJSON(packageJSON, config);
};

const updatePackageJSON = async (filePath, config) => {
  const file = require(filePath);
  file.name = config.name;
  file.description = config.desc;
  await writeFile(filePath, JSON.stringify(file, null, 2));
};

inquirer.prompt([{
  type: 'input',
  name: 'name',
  message: 'What\'s your app name?'
}, {
  type: 'input',
  name: 'desc',
  message: 'What\'s your app description?'
}, {
  name: 'type',
  type: 'list',
  message: 'Select App Type',
  choices: [
    { name: 'Full Scrolling', value: 'full-scrolling' },
    { name: 'React UI Without Router', value: 'react-ui-without-router' }
  ]
}])
  .then(copyBoilerplate)
  .then(() => {
    console.log('Initial done!'.green.bold);
    console.log('Please run npm install or yarn install.'.green.bold);
  })
  .catch(err => {
    console.log(err);
  });
