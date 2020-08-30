const express = require('express')
require('./db/mongoose')
const Data = require('./models/data')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
var total = 0
 app.post('/data', (req, res ) =>{
    const data = new Data(req.body)
    total  = total + data.confirmed
    data.count = total  
     console.log(data.confirmed)
    data.save().then(() =>{
        res.send(data)
    }).catch(() =>{
        res.status(400).send(e)
    })
 })

app.get('/data', (req, res) =>{
    Data.find({}).then((data) =>{
        res.send(data)
    }).catch((e) =>{
        res.status(500).send()
    })
})





app.listen(port, () =>{
    console.log('Server is on port ' + port )
})