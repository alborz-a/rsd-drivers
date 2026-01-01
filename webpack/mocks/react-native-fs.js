module.exports = {
  DocumentDirectoryPath: '/documents',
  CachesDirectoryPath: '/caches',
  readFile: () => Promise.resolve(''),
  writeFile: () => Promise.resolve(),
  exists: () => Promise.resolve(false),
  mkdir: () => Promise.resolve(),
};
