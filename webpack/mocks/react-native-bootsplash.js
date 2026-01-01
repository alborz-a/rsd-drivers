module.exports = {
  hide: () => {
    return new Promise((resolve) => {
      const splash = document.getElementById('bootsplash');
      if (splash) {
        splash.style.display = 'none';
        splash.remove();
      }
      resolve();
    });
  },
  show: () => Promise.resolve(),
  getVisibilityStatus: () => Promise.resolve('hidden'),
};
