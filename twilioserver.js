const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')
const Sequelize = require('sequelize')

const app = express()
const password = "<redacted>"
const database = new Sequelize('<redacted>', '<redacted>', password, {
  host: '<redacted>', //from heroku
  dialect: 'postgres',
  operatorsAliases: false,
  dialectOptions: {
    ssl: true
  }
})

const CatchPhrase = database.define('catchPhrase', {
  message: Sequelize.STRING
})

// Webhook endpoint to create a new catch-phrase through twilio
app.use(bodyParser.urlencoded({ extended: false }))
app.post("/twilio", function(request, response) {
  database.sync().then(() =>
    CatchPhrase.create({ message: request.body.Body }))

  // this is for sending a response from twilio docs
  const sms = new twilio.twiml.MessagingResponse()
  response.writeHead(200, { 'Content-Type': 'text/xml' })
  response.end(sms.toString())
})

// Endpoint to fetch the current catch-phrase
app.use("/message", (request, response) => {
  database.sync().then(() =>
    CatchPhrase.findAll({
      limit: 1,
      order: [[ 'createdAt', 'DESC' ]]
    }))
    .then(entries =>
      response.send(entries[0].message))
    .catch(error => {
      response.send("Oops, something went wrong :(")
      throw error
    })
})

// Static files
app.use(express.static(__dirname + "/public"))
app.listen(process.env.PORT || 3000) //this line runs my server
