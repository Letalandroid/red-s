const app = require('./app')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

// Routes
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));