const backgroundFetchMock = {
  configure: () => Promise.resolve(),
  finish: () => {},
  status: () => Promise.resolve(0),
};

module.exports = backgroundFetchMock;
module.exports.default = backgroundFetchMock;
