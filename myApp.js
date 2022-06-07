let express = require('express');
let app = express();
let bodyParser = require('body-parser')

app.use("/public", express.static(__dirname + "/public"))

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.use(bodyParser.urlencoded({extended: false}))

app.route("/name").get(function(req, res) {
  console.log(req.query)
  res.json({name: `${req.query.first} ${req.query.last}`})
}).post(function(req, res) {
  console.log(req.body.first)
  console.log(req.body.last)
  res.json({name: `${req.body.first} ${req.body.last}`})
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/json", (req, res) => {
  const helloJSON = "Hello json"
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = helloJSON.toUpperCase()
  } else {
    message = helloJSON
  }

  const data = {
    "message": message
  }

  res.send(data)
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  next()},
  (req, res) => {
    const data ={
    "time": req.time
    }
  res.send(data)
})

app.get("/:word/echo", (req, res) => {
  const {word} = req.params
  res.json({echo: word})
})

app.get("/name", (req, res) => {
  var { first: FirstName, last: LastName} = req.query
  res.json({
    name: `${FirstName} ${LastName}`
  })
})


































module.exports = app;
