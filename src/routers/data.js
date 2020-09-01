const express = require('express')

const Data = require("../models/data")
const { count } = require('../models/data')
const router = new express.Router()




router.post('/data', (req, res ) =>{
    const data = new Data(req.body)
    var total = 0
    var count = 0
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
       
        
         var adjacent_district_string = data.adjacent_district
         //console.log(adjacent_district_string)
        var adjacent_district = adjacent_district_string.split(" ")
        
         length = adjacent_district.length
        
        for(i=0; i<length; i++)
        
        {
             Data.find({district_id :adjacent_district[i]}).then((adj_data) =>{
                 if(adj_data[0].status=="High risk"){
                     count = count + 1
                     if(count > ((count/100)*70)){
                         data.status = "Extereme risk region"
                     }
                  }
                
            })
            
        }
        
    data.save().then(() =>{
       res.send(data)

    
    }).catch(() => {
        res.status(400).send(e)
    })
 })



router.patch('/data/:id', async (req, res) =>{
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


router.get('/data', (req, res) =>{
    Data.find({}).then((data) =>{
        res.send(data)
    }).catch((e) =>{
        res.status(500).send()
    })

   


    })

module.exports = router