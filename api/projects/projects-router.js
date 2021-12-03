// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const {
    errorHandling,
    checkId,
    validateBody,
} = require('./projects-middleware')

const Projects = require('./projects-model') 


//`[GET] /api/projects`
router.get('/', (req, res, next) => {
    Projects.get()
        .then(test => {
            res.status(200).json(test)
        })
        .catch(err => {
            next(err)
        });
})

// [GET] /api/projects/:id`
router.get('/:id', checkId, (req, res, next) => {
    res.status(200).json(req.project)
})

//[POST] /api/projects`
router.post('/', validateBody, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.use(errorHandling)
module.exports = router