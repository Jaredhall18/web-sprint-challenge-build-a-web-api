// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const {
    checkId,
    validateBody,
} = require('./actions-middlware')
//`[GET] /api/projects`
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            next(err)
        });
})

//`[GET] /api/actions/:id`
router.get('/:id', checkId, (req, res, next) => {
    res.status(200).json(req.action)
})

//[POST] /api/actions`
router.post('/', validateBody, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            next(err)
        })
})

// [PUT] /api/actions/:id`
router.put('/:id', checkId, validateBody, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.json(action)
        })
        .catch(err => {
            next(err)
        })
})


module.exports = router
