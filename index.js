const app = require('./app')

// Routes
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));