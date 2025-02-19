const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendNotification: (message) => {
    new Notification("Markdown Notes", { body: message });
  },
});
