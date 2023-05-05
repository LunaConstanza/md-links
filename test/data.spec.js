const { existsPath, isDir, isMD, isAbsolutePath, pathBasename, pathResolve, readDir, extractionFilesMD, readFile, extractionLinks, dataLinks, stats } = require('../data.js')

// DATA A UTILIZAR
const pathErronea = 'package.jn';
const pathDiferent = 'package.json';
const pathVacia = 'prueba-vacia.md'
const pathFolder = 'carpeta-prueba';
const pathFile = 'prueba0.md';
const pathSecondFile = 'prueba1.md'
const pathAbsolute = 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\prueba0.md';
const pathAbsolute2 = 'C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba1.md';

// TEST DE TODAS LAS FUNCIONES EXISTENTES
describe('La función existsPath valida si la ruta existe.', () => {
    it('Debería retornar una función', () => {
      expect(typeof existsPath).toBe('function');
    });
    it('Debería retornar true', /*sync*/() => {
      return existsPath(pathFile).then(res => expect(res).toBe(true));
      // const resolve = await existsPath(pathFile);
      // expect(resolve).toBe(true);
    });
    it('Debería retornar false', /*sync*/() => {
      return existsPath(pathErronea).catch(rej => expect(rej).toBe(false));
      // await expect(existsPath(pathErronea)).rejects.toMatch(false);
    });
  });
  
  describe('La función isDir valida si la ruta es directorio.', () => {
    it('Debería retornar una función', () => {
      expect(typeof isDir).toBe('function');
    });
    it('Debería retornar true', () => {
      return isDir(pathFolder).then(res => expect(res).toBe(true));
    });
    it('Debería retornar false', () => {
      return isDir(pathFile).then(res => expect(res).toBe(false));
    });
  });
  
  describe('La función isMD valida si la ruta entregada tiene extensión .md', () => {
    it('Debería retornar una función', () => {
      expect(typeof isMD).toBe('function');
    });
    it('Debería retornar true', () => {
      expect(isMD(pathFile)).toBe(true);
    });
    it('Debería retornar false', () => {
      expect(isMD(pathDiferent)).toBe(false);
    });
  });
  
  describe('La función isAbsolutePath valida si la ruta es absoluta.', () => {
    it('Debería retornar una función', () => {
      expect(typeof isAbsolutePath).toBe('function');
    });
    it('Debería retornar true', () => {
      expect(isAbsolutePath(pathAbsolute)).toBe(true);
    });
    it('Debería retornar false', () => {
      expect(isAbsolutePath(pathFile)).toBe(false);
    });
  });
  
  describe('La función pathBasename retorna solo el nombre del archivo de una ruta absoluta.', () => {
    it('Debería retornar una función', () => {
      expect(typeof pathBasename).toBe('function');
    });
    it('Debería retornar el nombre del archivo de una ruta absoluta.', () => {
      expect(pathBasename(pathAbsolute)).toBe(pathFile);
    });
  });
  
  describe('La función pathResolve retorna una ruta absoluta desde una ruta relativa.', () => {
    it('Debería retornar una función', () => {
      expect(typeof pathResolve).toBe('function');
    });
    it('Debería retornar la ruta absoluta de una ruta relativa', () => {
      expect(pathResolve(pathFile)).toBe(pathAbsolute);
    });
    it('Debería retornar la ruta absoluta de una ruta relativa anidada en otra carpeta.', () => {
      expect(pathResolve(pathSecondFile, pathFolder)).toBe(pathAbsolute2);
    });
  });
  
  describe('La función readDir retorna la lectura de archivos de un directorio.', () => {
    it('Debería retornar una función', () => {
      expect(typeof readDir).toBe('function');
    });
    it('Debería retornar un array con archivos de un directorio.', () => {
      const arrayFiles = [
        'carpeta2-prueba',
        'prueba1.md',
        'prueba2.md'
      ];
      expect(readDir(pathFolder)).toStrictEqual(arrayFiles);
    });
  });
  
  describe('La función extractionFilesMD extrae archivos markdown recursivamente de un directorio.', () => {
    it('Debería retornar una función', () => {
      expect(typeof extractionFilesMD).toBe('function');
    });
    it('Debería retornar un array de archivos markdown', () => {
      const arrayFilesMD = [
        "C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\carpeta2-prueba\\prueba3.md",
        "C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba1.md",
        "C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md"
      ];
      return extractionFilesMD(pathFolder).then(res => expect(res).toStrictEqual(arrayFilesMD));
    });
  });
  
  describe('La función readFile lee un archivo markdown y extrae información de los links.', () => {
    it('Debería retornar una función', () => {
      expect(typeof readFile).toBe('function');
    });
    it('Debería retornar un array con objetos de cada link y su información.', () => {
      const arrayLinks1 = [
        {
          file: 'prueba0.md',
          line: 31,
          text: 'md-links',
          href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg'
        },
        {
          file: 'prueba0.md',
          line: 33,
          text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
          href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175'
        },
        {
          file: 'prueba0.md',
          line: 36,
          text: 'Recursión o Recursividad - ',
          href: 'https://medium.com/laboratoria-developers/recursi%C3%B3n-o-recursiv'
        },
        {
          file: 'prueba0.md',
          line: 38,
          text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
          href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175'
        }
      ];
      return readFile(pathFile).then(res => expect(res).toStrictEqual(arrayLinks1));
    });
    it('Debería retornar "no existen links para analizar" en un archivo de solo texto sin links', () => {
      return readFile(pathAbsolute2).catch(rej => expect(rej).toStrictEqual('- En prueba1.md no existen links para analizar.'));
    });
    it('Debería retornar "no existe texto para analizar" en un archivo vacio', () => {
      return readFile(pathVacia).catch(rej => expect(rej).toStrictEqual('- En prueba-vacia.md no existe texto para analizar.'));
    });
  });
  
  describe('La función extractionLinks extrae links de un array de archivos markdown.', () => {
    it('Debería retornar una función', () => {
      expect(typeof extractionLinks).toBe('function');
    });
    it('Debería retornar un array con todos los links encontrados en diferentes archivos', () => {
      const arrayFilesMD = [
        "C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\carpeta2-prueba\\prueba3.md",
        "C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba1.md",
        "C:\\Users\\Luna Contanza\\Documents\\Laboratoria Laboral\\REPO LABORATORIA\\MI-md-links\\carpeta-prueba\\prueba2.md"
      ];
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
      return extractionLinks(arrayFilesMD).then(res => expect(res).toStrictEqual(arrayLinks2));
    });
  });
  
  describe('La función dataLinks retorna el estado de los links.', () => {
    it('Debería retornar una función', () => {
      expect(typeof dataLinks).toBe('function');
    });
    it('Debería retornar un array con objetos de cada link y su estado.', () => {
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
      return dataLinks(arrayLinks1).then(res => expect(res).toStrictEqual(arrayDataLinks1));
    });
  });
  
  describe('La función stats retorna un objeto con el total de links, cuántos están rotos y son únicos.', () => {
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
    it('Debería retornar una función', () => {
      expect(typeof stats).toBe('function');
    });
    it('Debería retornar el total de links y cuántos son únicos.', () => {
      expect(stats(arrayDataLinks1)).toStrictEqual('Total: 4, Unique: 3');
    });
    it('Debería retornar el total de links, cuántos están rotos y son únicos.', () => {
      expect(stats(arrayDataLinks1, '--validate')).toStrictEqual('Total: 4, Broken: 2, Unique: 3');
    });
    it('Debería retornar un array con los links rotos.', () => {
      const arrayFail = [
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
      ]
      expect(stats(arrayDataLinks1, '--brokens')).toStrictEqual(arrayFail);
    });
  });