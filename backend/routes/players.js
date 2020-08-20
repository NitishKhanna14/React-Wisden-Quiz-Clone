const express = require("express")
const mongoose = require("mongoose")
const player = require("../models/player")

const router = express.Router() 

router.get('/', async (req,res) => {
    const playersDb =  await player.find()
    res.send(playersDb)
})

router.post('/add', async (req,res) => {
    const newPlayer = new player({
        name: req.body.name,
        country: req.body.country
    })
    try {
        const dat = await newPlayer.save()
        res.json(dat)
    } catch(err) {
        res.send(err)
    }
})

router.put('/update/:id', async (req,res) => { 
    try {
        const upPlayer = await player.findById(req.params.id)
        upPlayer.name = req.body.name
        upPlayer.country = req.body.country
        await upPlayer.save()
        res.send(upPlayer)
    } catch(err) {
        console.log(err)
    }
})

router.delete('/delete/:id', async (req,res) => {
    try {
        const delPlayer = await player.findByIdAndDelete(req.params.id)
        res.json(delPlayer)
    } catch(err) {
        console.log(err)
    }
})
 
module.exports = router