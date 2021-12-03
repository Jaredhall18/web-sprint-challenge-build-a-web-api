// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const {
    checkId,
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


module.exports = router
