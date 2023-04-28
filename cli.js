#!/usr/bin/env node
const mdLinks = require('./index.js')
const color = require('colors');
const gradient = require('gradient-string');

const [method, path, option1, option2] = process.argv.slice(2);
console.log(method, path, option1, option2);

// Validación de parámetros por terminal
if (method === 'mdLinks' && path && option1 === undefined) {
    mdLinks(path)
        .then(res => {
            console.log(res);
        })
        .catch(rej => {
            console.log(color.bold.red(rej));
        })
}
else if (method === 'mdLinks' && path && option1 === '--validate' && option2 === undefined) {
    mdLinks(path, option1)
        .then(res => {
            console.log(res);
        })
        .catch(rej => {
            console.log(color.bold.red(rej));
        })
}
else if (method === 'mdLinks' && path && option1 === '--stats' && option2 === undefined) {
    mdLinks(path, option1)
        .then(res => {
            console.log(gradient.cristal(res));
        })
        .catch(rej => {
            console.log(color.bold.red(rej));
        })
}
else if (method === 'mdLinks' && path && option1 === '--validate' && option2 === '--stats' || method === 'mdLinks' && path && option1 === '--stats' && option2 === '--validate') {
    mdLinks(path, '--stats --validate')
        .then(res => {
            console.log(gradient.cristal(res));
        })
        .catch(rej => {
            console.log(color.bold.red(rej));
        })
}
else {
    console.log(color.bold.red('Error en los parámetros utilizados.'));
}

// mdLinks('./carpeta-prueba', '--stats')
//     .then(res => console.log(res))
//     .catch(err => console.log(color.bold.red(err)));