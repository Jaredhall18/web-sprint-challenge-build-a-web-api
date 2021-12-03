// add middlewares here related to projects
const Projects = require('./projects-model')

function errorHandling(err, req, res, next) {
        res.status(err.status || 500).json({
            message: `There was an error processing your request: ${err.message}`,
            stack: err.stack,
        })
}

async function checkId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            req.project = project
            next();
        } else {
            next({status: 404, message: "That ID does not exist"})
        }
    } catch (error) {
        next(error)
    }
}


function validateBody(req, res, next) {
    const { name, description, completed } = req.body;
    if(name && description && (completed === false || completed === true)) {
       next() 
    } else {
        next({ status: 400, message: "Body is missing data"}) 
    }
}

module.exports = {
    errorHandling,
    checkId,
    validateBody,
}