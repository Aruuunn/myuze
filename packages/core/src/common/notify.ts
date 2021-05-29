const notifications: Notification[] = [];

export function notify(title: string, options: NotificationOptions): void {
  const createNotification = () => {
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

  // Let's check if the browser supports notifications
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      createNotification();
    }

    // Otherwise, we need to ask the user for permission
    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          createNotification();
        }
      });
    }
  }
}
