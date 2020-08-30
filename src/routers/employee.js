const express = require('express')
const Emp = require("../models/employee")
const router = new express.Router()

router.post('/emp', (req, res) =>{
    const emp = new Emp(req.body)

    emp.save().then(() => {
        res.send(emp)
    }).catch((e) =>{
        res.status(400).send(e)
    })
})

router.get('/emp', (req, res) =>{
    Emp.find({}).then((emps) =>{
        res.send(emps)
    }).catch((e) =>{
        res.status(500).send()
    })
})

router.get('/emp/:id', (req, res) =>{
    const _id = req.params.id

    Emp.findById(_id).then((emp) =>{
        if(!emp){
            return res.status(404).send()
        }
        res.send(emp)
    })
})

router.patch('/emp/:id', (req, res) => {
    
    try{
        const emp = Emp.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})

        if(!emp) {
            return res.status(404).send()
        }

    } catch (e) {
        res.status(400).send()
    }

})





module.exports = router