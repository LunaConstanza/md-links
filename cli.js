#!/usr/bin/env node
const mdLinks = require('./index.js')
const color = require('colors');

mdLinks('./carpeta-prueba', '--stats --validate')
    .then(res => console.log(res))
    .catch(err => console.log(color.bold.red(err)));