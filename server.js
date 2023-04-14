const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const { MONGO_CLOUD_CONNECTION, PORT = 3000 } = process.env

mongoose
  .connect(MONGO_CLOUD_CONNECTION)
  .then(() => {
    console.log('Connected to the cloud database!')
    app.listen(PORT, () => console.log(`The server running. Use our API on port ${PORT}`))
  })
  .catch((error) => {
    console.error("Couldn't connect to the database");
    process.exit(1);
  })



// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
