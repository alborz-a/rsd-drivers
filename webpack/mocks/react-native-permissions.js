module.exports = {
  check: () => Promise.resolve('granted'),
  request: () => Promise.resolve('granted'),
  PERMISSIONS: {
    IOS: {},
    ANDROID: {},
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
  },
};
