function download (req, res) {
    var file = __dirname + '/apis.zip';
    res.download(file); // Set disposition and send it.
}

module.exports.download = download;