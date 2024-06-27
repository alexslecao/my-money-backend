const _ = require('lodash');

const parseError = nodeBundleErros => {
    const errors = [];

    _.forIn(nodeBundleErros, error => errors.push(error.message));

    return errors;
};

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle;
    
    if (bundle.errors) {
        const errors = parseError(bundle.errors);
        res.status(500).json({ errors });
    }
    else {
        next();
    }
};