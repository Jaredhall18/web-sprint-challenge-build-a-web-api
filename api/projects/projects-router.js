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
        .then(projects => {
            res.status(200).json(projects)
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

//`[PUT] /api/projects/:id`
router.put('/:id', checkId, validateBody, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            next(err)
        })
})

// [DELETE] /api/projects/:id`
router.delete('/:id', checkId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(record => {
            res.status(200).json()
        })
        .catch(err => {
            next(err)
        })
})

//[GET] /api/projects/:id/actions
router.get('/:id/actions', checkId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            next(err)
        })
})

router.use(errorHandling)
module.exports = router