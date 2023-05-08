// Funciones puras
const fs = require('node:fs');
const fetch = require('node-fetch');
const path = require('node:path');
const color = require('colors');

const existsPath = path => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, (err => err ? reject(false) : resolve(true)));
    });
};

const isDir = path => {
    return new Promise((resolve) => {
        fs.stat(path, (err, stats) => {
            resolve(stats.isDirectory())
        });
    });
};

const isFile = inputPath => fs.lstatSync(inputPath).isFile();

const isMD = file => path.extname(file) === '.md';

const isAbsolutePath = string => path.isAbsolute(string);

const pathBasename = file => path.basename(file)

const pathResolve = (file, dir) => {
    if (dir === undefined) {
        return path.resolve(file);
    } else {
        return path.resolve(dir, file);
    }
}

const readDir = dir => fs.readdirSync(dir, 'utf8')

let arrayMD = [];
const extractionFilesMD = dir => {
    return new Promise((resolve) => {
        const files = readDir(dir);
        files.filter(file => {
            const newPath = pathResolve(file, dir)
            if(isFile(newPath)){
                if (isMD(newPath)) {
                    arrayMD.push(newPath);
                }
            } else {
                extractionFilesMD(newPath);
            }
        })
        resolve(arrayMD);
    })
}

const readFile = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (data !== '') {
                const myRegExp = /\[([a-zA-ZÀ-ÿ0-9-—._:`'"?¿!¡,()\s\u00f1\u00d1]+)]\(http[a-zA-ZÀ-ÿ0-9-@:;!%._/?&\+~#=]{1,250}\)/g;
                if (myRegExp.test(data)) {
                    let allLinks = [];
                    const splitData = data.split("\n");
                    for (let i = 0; i < splitData.length; i++) {
                        let link = splitData[i].match(myRegExp);
                        if (link !== null) {
                            allLinks.push({
                                'file': file,
                                'line': i + 1,
                                'text': link[0].split(']')[0].substring(1, 51),
                                'href': link[0].split(']')[1].slice(1, -1)
                            })
                        }
                    }
                    // console.log(color.bold.cyan(`- En ${pathBasename(file)} existen ${allLinks.length} links para analizar.`));
                    resolve(allLinks)
                } else {
                    reject(`- En ${pathBasename(file)} no existen links para analizar.`);
                }
            } else {
                reject(`- En ${pathBasename(file)} no existe texto para analizar.`);
            }
        });

    })
}

const extractionLinks = array => {
    return new Promise((resolve) => {
        const allLinks = [];
        const count = array.length - 1;
        let index = 0;
        const iteradorManual = (archivo) => {
            readFile(archivo)
                .then(res => {
                    allLinks.push(res)
                })
                .catch(err => {
                    // console.log(color.bold.red(err));
                    // reject(err)
                }).finally(() => {
                    index++
                    if (index <= count) {
                        iteradorManual(array[index])
                    } else {
                        resolve(allLinks.flat())
                    }
                });
        }
        iteradorManual(array[index]);
    })
};

const dataLinks = links => {
    const objs = links.map(e => {
        return fetch(e.href)
            .then((res) => {
                return {
                    file: e.file,
                    line: e.line,
                    text: e.text,
                    href: e.href,
                    status: res.status,
                    condition: 'ok',
                }
            })
            .catch((err) => {
                return {
                    file: e.file,
                    line: e.line,
                    text: e.text,
                    href: e.href,
                    status: err.status === undefined ? 'No existe status' : err.status,
                    condition: 'fail',
                }
            })
    });
    return Promise.all(objs)
}

const stats = (links, extra) => {
    const uniques = [];
    links.forEach(link => {
        if (!uniques.includes(link.href)) {
            uniques.push(link.href)
        }
    })
    const brokens = links.filter(link => link.condition === 'fail')
    if (extra === undefined) {
        return `Total: ${links.length}, Unique: ${uniques.length}`;
    } else if (extra === '--validate') {
        return `Total: ${links.length}, Broken: ${brokens.length}, Unique: ${uniques.length}`;
    } else if (extra === '--brokens'){
        return brokens;
    }
}

module.exports = {
    existsPath,
    isAbsolutePath,
    pathResolve,
    pathBasename,
    isDir,
    isMD,
    readDir,
    readFile,
    extractionFilesMD,
    extractionLinks,
    dataLinks,
    stats
}