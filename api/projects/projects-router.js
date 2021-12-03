// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const {
    errorHandling,
} = require('./projects-middleware')

const Projects = require('./projects-model') 


//`[GET] /api/projects`
router.get('/', (req, res, next) => {
    Projects.get(req.query)
        .then(project => {
            throw new Error("test")
        })
        .catch(next);
    
})
router.use(errorHandling)
module.exports = router