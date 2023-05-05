const { existsPath, isDir, isMD, extractionFilesMD, extractionLinks, dataLinks, stats, isAbsolutePath, pathResolve, pathBasename } = require('./data.js');
const color = require('colors');
const gradient = require('gradient-string');

const mdLinks = (path, option) => {
    return new Promise((resolve, reject) => {
        existsPath(path)
            .then(() => {
                if (!isAbsolutePath(path)) {
                    path = pathResolve(path)
                }
                isDir(path).then((res) => {
                    if (res) {
                        console.log(color.bold('La ruta entregada es un directorio'));
                        extractionFilesMD(path)
                            .then(res => {
                                const linksBasename = res.map(file => {
                                    return pathBasename(file);
                                });
                                if (linksBasename.length !== 0) {
                                    console.log(`Se encontraron ${linksBasename.length} archivos con extensión markdown:`, linksBasename);
                                    extractionLinks(res)
                                        .then(res => {
                                            console.log(gradient.cristal('Analizando...'));
                                            switch (option) {
                                                case undefined:
                                                    resolve(res);
                                                    break;
                                                case '--validate':
                                                    resolve(dataLinks(res))
                                                    break;
                                                case '--stats':
                                                    dataLinks(res).then(res => resolve(stats(res)))
                                                    break;
                                                case '--stats --validate':
                                                    dataLinks(res).then(res => resolve(stats(res, '--validate')))
                                                    break;
                                                case '--brokens':
                                                    dataLinks(res).then(res => resolve(stats(res, option)))
                                                    break;
                                            }
                                        })
                                } else {
                                    reject(`En '${pathBasename(path)}' no se encontraron archivos markdown.`)
                                }
                            })
                    } else {
                        console.log(color.bold('La ruta entregada es un archivo'));
                        if (isMD(path)) {
                            extractionLinks([path])
                                .then(res => {
                                    console.log(gradient.cristal('Analizando...'))
                                    switch (option) {
                                        case undefined:
                                            resolve(res);
                                            break;
                                        case '--validate':
                                            resolve(dataLinks(res))
                                            break;
                                        case '--stats':
                                            dataLinks(res).then(res => resolve(stats(res)))
                                            break;
                                        case '--stats --validate':
                                            dataLinks(res).then(res => resolve(stats(res, '--validate')))
                                            break;
                                        case '--brokens':
                                            dataLinks(res).then(res => resolve(stats(res, option)))
                                            break;
                                    }
                                })
                        } else {
                            reject('El archivo no tiene extensión markdown.')
                        }
                    }
                })
            })
            .catch(() => reject('La ruta entregada no existe.'));
    })
};

module.exports = mdLinks;