const express = require('express')
require('./db/mongoose')
const Data = require('./models/data')
const Emp = require('./models/employee')
const userRouter = require('./routers/employee')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)




var risk_status = " "


 app.post('/data', (req, res ) =>{
    const data = new Data(req.body)
    var total = 0
    total  = data.confirmed
    data.count = total  
    var val = data.confirmed - data.recovered
    
        if(data.fatal > 30 ){
            data.status = "High risk"
        } else if (data.hospitalized > 30 && data.confirmed> 50 ){
        data.status = "High risk"
         }else if (Math.abs(val)>100) {
            data.status ="High risk"
        }
    
    data.save().then(() =>{
        res.send(data)
    }).catch(() => {
        res.status(400).send(e)
    })
 })



app.patch('/data/:id', async (req, res) =>{
    try{
        const data = await Data.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true })
        
        if(!data){
            return res.status(404).send()
        }

        res.send(data)
    } catch(e){
        res.status(400).send(e)
    }
})


app.get('/data', (req, res) =>{
    Data.find({}).then((data) =>{
        res.send(data)
    }).catch((e) =>{
        res.status(500).send()
    })
})


app.post('/emp', (req, res) =>{
    const emp = new Emp(req.body)

    emp.save().then(() => {
        res.send(emp)
    }).catch((e) =>{
        res.status(400).send(e)
    })
})

app.get('/emp', (req, res) =>{
    Emp.find({}).then((emps) =>{
        res.send(emps)
    }).catch((e) =>{
        res.status(500).send()
    })
})

app.get('/emp/:id', (req, res) =>{
    const _id = req.params.id

    Emp.findById(_id).then((emp) =>{
        if(!emp){
            return res.status(404).send()
        }
        res.send(emp)
    })
})

app.patch('/emp/:id', (req, res) => {
    
    try{
        const emp = Emp.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})

        if(!emp) {
            return res.status(404).send()
        }

    } catch (e) {
        res.status(400).send()
    }

})



app.listen(port, () =>{
    console.log('Server is on port ' + port )
})