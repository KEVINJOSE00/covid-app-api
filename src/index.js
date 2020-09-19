
const path = require('path')
const express = require('express')
//const hbs = require('hbs')
require('./db/mongoose')

const empRouter = require('./routers/employee')
const dataRouter = require('./routers/data')
const port = process.env.PORT || 3000


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')


app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))


app.use(express.json())
app.use(empRouter)
app.use(dataRouter)


app.get('', (req, res) =>{
    res.render('index')
})



app.listen(port, () =>{
    console.log('Server is on port ' + port )
})