
exports.add = function (req, res) {
    var bookrep = require('../../microservice/user/userrespository');
    var content=bookrep.add({uniqueId:require('node-uuid').v1(),lastName: 'Hancock',firstName: 'John'},handler);

};