const notifications: Notification[] = [];

const createNotification = (title: string, options: NotificationOptions) => {
  notifications.forEach((notification) => {
    notification.close();
  });

  setTimeout(() => {
    const notification = new Notification(title, options);
    notifications.push(notification);
    setTimeout(() => {
      notification.close();
    }, 3000);
  }, 100);
};

export function notify(title: string, options: NotificationOptions): void {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      createNotification(title, options);
    }

    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          createNotification(title, options);
        }
      });
    }
  }
}
