function debug (req, res, next) {
    console.log("HEADERS", req.headers);
    console.log("PARAMS", req.params);
    console.log("QUERY", req.query);
    next();
}

module.exports =  debug;