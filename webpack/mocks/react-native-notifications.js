const notificationsMock = {
    events: () => ({
      registerRemoteNotificationsRegistered: () => ({ remove: () => {} }),
      registerRemoteNotificationsRegistrationFailed: () => ({ remove: () => {} }),
      registerNotificationReceivedForeground: () => ({ remove: () => {} }),
      registerNotificationReceivedBackground: () => ({ remove: () => {} }),
      registerNotificationOpened: () => ({ remove: () => {} }),
    }),
    registerRemoteNotifications: () => {},
    postLocalNotification: () => {},
    cancelLocalNotification: () => {},
    getInitialNotification: () => Promise.resolve(null),
    isRegisteredForRemoteNotifications: () => Promise.resolve(false),
    checkPermissions: () => Promise.resolve({}),
    requestPermissions: () => Promise.resolve({}),
};

module.exports = {
  Notifications: notificationsMock,
};
