// add middlewares here related to projects
function errorHandling(err, req, res, next) {
        res.status(err.status || 500).json({
            message: `There was an error processing your request: ${err.message}`,
            stack: err.stack,
        })
}

module.exports = {
    errorHandling,
}