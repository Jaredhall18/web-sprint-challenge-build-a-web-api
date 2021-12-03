// add middlewares here related to actions
const Actions = require('./actions-model')

async function checkId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            req.action = action
            next();
        } else {
            next({status: 404, message: "That ID does not exist"})
        }
    } catch (error) {
        next(error)
    }
}

function validateBody(req, res, next) {
    const { notes, description, project_id } = req.body;
    if(notes && description && project_id) {
       next() 
    } else {
        next({ status: 400, message: "Body is missing data"}) 
    }
}

module.exports = {
    checkId,
    validateBody,
}