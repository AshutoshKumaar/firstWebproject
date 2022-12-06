const { MongoClient } = require('mongodb')
const url =
  'mongodb+srv://AshutoshKumar:bhulgaya@cluster0.9fm9zse.mongodb.net/?retryWrites=true&w=majority'
const cilent = new MongoClient(url)

const dataBase = 'RandomInfo'
const collectionName = 'macebook'

async function dbConnect() {
  let results = await cilent.connect()
  let db = results.db(dataBase)
  return db.collection(collectionName)
}
module.exports = dbConnect
