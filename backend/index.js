const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const process = require("process")
const cookieParser = require('cookie-parser')

require("dotenv").config()

// set port, listen for requestsxs
const PORT = process.env.PORT
const FRONT_URL = process.env.FRONT_URL

const app = express()


// enable cors
app.options(FRONT_URL, cors())
app.use(
  cors({
    origin: FRONT_URL,
    credentials: true,
  })
)


// parse json request body
app.use(express.json())

app.use(cookieParser());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require("./src/models/db")
require("./src/routes/routes.js")(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

module.exports = app
