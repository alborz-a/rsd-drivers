module.exports = {
  CameraRoll: {
    getPhotos: () => Promise.resolve({ edges: [] }),
    save: () => Promise.resolve(),
  },
  useCameraRoll: () => [
    { edges: [] },
    () => Promise.resolve(),
    () => Promise.resolve(),
  ],
};
