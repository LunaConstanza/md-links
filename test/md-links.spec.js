const mdLinks = require('../index.js');

// DATA A UTILIZAR
const pathErronea = 'package.jn';
const pathDiferent = 'package.json';
const pathOtherFile = 'test';
const pathFolder = './carpeta-prueba';
const pathFile = 'prueba0.md';

// TEST PARA MDLINKS
describe('La función mdLinks segun la ruta y sus parametros retorna la información de los links encontrados.', () => {
  it('Debería retornar una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Folder: Debería retornar un array con objetos que contengan información de los links encontrados', () => {
    const arrayLinks2 = [
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\carpeta2-prueba\\prueba3.md',
        line: 1,
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 1,
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 6,
        text: 'md-links',
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 7,
        text: 'Linea de comando CLI',
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 8,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175'
      }
    ];
    return mdLinks(pathFolder).then(res => expect(res).toStrictEqual(arrayLinks2));
  });
  it('Folder: Debería retornar un array con objetos que contengan información de los links encontrados mas el estatus de cada uno', () => {
    const arrayDataLinks2 = [
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\carpeta2-prueba\\prueba3.md',
        line: 1,
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        status: 200,
        condition: 'ok'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 1,
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        status: 200,
        condition: 'ok'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 6,
        text: 'md-links',
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        status: 200,
        condition: 'ok'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 7,
        text: 'Linea de comando CLI',
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        status: 403,
        condition: 'ok'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',
        line: 8,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        status: 'No existe status',
        condition: 'fail'
      }
    ];
    return mdLinks(pathFolder, '--validate').then(res => expect(res).toStrictEqual(arrayDataLinks2));
  });
  it('Folder: Debería retornar un contador con el total de links encontrados y cuántos son únicos.', () => {
    const pathFolder2 = 'carpeta-prueba/carpeta2-prueba';
    return mdLinks(pathFolder2, '--stats').then(res => expect(res).toStrictEqual('Total: 1, Unique: 1'));
  });
  it('Folder: Debería retornar un contador con el total de links encontrados, cuántos son únicos y cuántos estan rotos.', () => {
    const pathFolder2 = 'carpeta-prueba/carpeta2-prueba';
    return mdLinks(pathFolder2, '--stats --validate').then(res => expect(res).toStrictEqual('Total: 1, Broken: 0, Unique: 1'));
  });
  it('Folder: Debería retornar un array con los links rotos.', () => {
    const arraFail1 = [
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md',    line: 8,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ', 
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        status: 'No existe status',
        condition: 'fail'
      }
    ]
    return mdLinks(pathFolder, '--brokens').then(res => expect(res).toStrictEqual(arraFail1));
  });
  it('File: Debería retornar un array con objetos que contengan información de los links encontrados', () => {
    const arrayLinks1 = [
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 31,
        text: 'md-links',
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 33,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 36,
        text: 'Recursión o Recursividad - ',
        href: 'https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursiv'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 38,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175'
      }
    ];
    return mdLinks(pathFile).then(res => expect(res).toStrictEqual(arrayLinks1));
  });
  it('File: Debería retornar un array con objetos que contengan información de los links encontrados mas el estatus de cada uno', () => {
    const arrayDataLinks1 = [
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 31,
        text: 'md-links',
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        status: 200,
        condition: 'ok'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 33,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        status: 'No existe status',
        condition: 'fail'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 36,
        text: 'Recursión o Recursividad - ',
        href: 'https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursiv',
        status: 403,
        condition: 'ok'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 38,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        status: 'No existe status',
        condition: 'fail'
      }
    ];
    return mdLinks(pathFile, '--validate').then(res => expect(res).toStrictEqual(arrayDataLinks1));
  });
  it('File: Debería retornar un contador con el total de links encontrados y cuántos son únicos.', () => {
    return mdLinks(pathFile, '--stats').then(res => expect(res).toStrictEqual('Total: 4, Unique: 3'));
  });
  it('File: Debería retornar un contador con el total de links encontrados, cuántos son únicos y cuántos estan rotos.', () => {
    return mdLinks(pathFile, '--stats --validate').then(res => expect(res).toStrictEqual('Total: 4, Broken: 2, Unique: 3'));
  });
  it('File: Debería retornar un array con los links rotos.', () => {
    const arrayFail2 = [
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 33,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        status: 'No existe status',
        condition: 'fail'
      },
      {
        file: 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md',
        line: 38,
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        status: 'No existe status',
        condition: 'fail'
      }
    ];
    return mdLinks(pathFile, '--brokens').then(res => expect(res).toStrictEqual(arrayFail2));
  });
  it('Folder: Debería retornar que el directorio entregado no contiene archivos markdown.', () => {
    return mdLinks(pathOtherFile).catch(rej => expect(rej).toStrictEqual("En 'test' no se encontraron archivos markdown."));
  });
  it('File: Debería retornar que el archivo no tiene extensión markdown.', () => {
    return mdLinks(pathDiferent).catch(rej => expect(rej).toStrictEqual('El archivo no tiene extensión markdown.'));
  });
  it('Path: Debería retornar que la ruta entregada no existe.', () => {
    return mdLinks(pathErronea).catch(rej => expect(rej).toStrictEqual('La ruta entregada no existe.'));
  });
});