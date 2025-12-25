const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  addNumbers: async (a, b) => {
    const res = await fetch("https:///127.0.0.1:8000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b }),
    });
    return res.json();
  },
});
