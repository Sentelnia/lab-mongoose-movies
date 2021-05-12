const express = require('express')
const router = express.Router()

const Celebrity = require('../models/celebrity')


//liste des celebrités

router.get('/celebrities/index', (req, res, next)=>{
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render('celebrities/index', {myCelebrities : celebritiesFromDB})
        })
        .catch(err => next(err))
    
})


//Create and add a celebrity

router.get('/celebrities/new', (req, res, next) =>{
    res.render('celebrities/new', {})
})

router.post('/celebrities', (req, res, next) =>{
    const newName = req.body.name;
    const newOccupation = req.body.occupation;
    const newCatchPhrase = req.body.catchPhrase;

    console.log(newName, newOccupation, newCatchPhrase)

    const celebrity = new Celebrity({
        name : newName,
        occupation: newOccupation,
        catchPhrase : newCatchPhrase
    })

    celebrity.save()
    .then(newCelebrity =>{
        console.log(newCelebrity)
        res.redirect('/celebrities/index')
    })
    .catch( err => res.render('celebrities/new'))
        
})


//Delete celebrity

router.post('/celebrities/:id/delete', (req, res, next) =>{
    console.log('id',req.params.id)
    Celebrity.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/celebrities/index'))
        .catch(err => {
            next(err)
        console.log(err)})
})


//Edit celebrity

router.get('/celebrities/:id/edit', (req, res, next) =>{
    Celebrity.findById(req.params.id)
        .then((celebrityToEdit) => res.render('celebrities/edit', {celebrity : celebrityToEdit}))
        .catch(err => next(err))
})

router.post('/celebrities/:id', (req, res, next) =>{
    Celebrity.findById(req.params.id)
        .then((celebrityFromDB)=>{
            celebrityFromDB.name = req.body.name
            celebrityFromDB.description = req.body.description
            celebrityFromDB.catchPhrase = req.body.catchPhrase

            celebrityFromDB.save()
                .then(()=> res.redirect('/celebrities/index'))
                .catch((err) => next(err))
        })
    .catch((err) => next(err))    
})

//Détail, show a specific celebrity

router.get('/celebrities/:id', (req, res, next) =>{
    Celebrity.findOne({_id: req.params.id})
    .then(theCelebrityFromDB =>{
        res.render('celebrities/show', {
            theCelebrity : theCelebrityFromDB
        })
    })
    .catch(err => next(err))
})



module.exports = router