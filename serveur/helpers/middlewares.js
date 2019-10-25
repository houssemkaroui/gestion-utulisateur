function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: '_ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsPost(req, res, next) {
    const { name, type,price,rating,warranty_years,available } = req.body

    if (name && type && price && rating && warranty_years && available ) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPost
}