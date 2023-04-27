const { existsPath, isDir, isMD, extractionFilesMD, extractionLinks, dataLinks, stats, isAbsolutePath, pathResolve, pathBasename } = require('./data.js');

const mdLinks = (path, option) => {
    return new Promise((resolve, reject) => {
        existsPath(path)
            .then(() => {
                if (!isAbsolutePath(path)) {
                    path = pathResolve(path)
                }
                isDir(path).then((res) => {
                    if (res) {
                        console.log('La ruta entregada es un directorio')
                        extractionFilesMD(path)
                            .then(res => {
                                // console.log(res);
                                const linksBasename = res.map(file => {
                                    return pathBasename(file);
                                });
                                console.log(`Se encontraron ${linksBasename.length} archivos con extensión markdown:`, linksBasename);
                                extractionLinks(res)
                                    .then(res => {
                                        // console.log(res);
                                        console.log('Analizando...');
                                        if (option === undefined) {
                                            resolve(res);
                                        } else if (option === '--validate') {
                                            resolve(dataLinks(res))
                                        } else if (option === '--stats') {
                                            resolve(stats(res))
                                        } else if (option === '--stats --validate') {
                                            dataLinks(res).then(res => resolve(stats(res, '--validate')))
                                        }
                                    })
                                    .catch(err => reject(err))
                            })
                            .catch(err => reject(err));
                    } else {
                        console.log('La ruta entregada es un archivo');
                        if (isMD(path)) {
                            extractionLinks([path])
                                .then(res => {
                                    console.log('Analizando...')
                                    if (option === undefined) {
                                        resolve(res);
                                    } else if (option === '--validate') {
                                        resolve(dataLinks(res))
                                    } else if (option === '--stats') {
                                        resolve(stats(res))
                                    } else if (option === '--stats --validate') {
                                        dataLinks(res).then(res => resolve(stats(res, '--validate')))
                                    }
                                })
                                .catch(err => reject(err));
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