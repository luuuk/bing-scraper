const bing = require("../index");
bing.search({
    q: "sugar pills idkhow",
    pageCount: 5
}, function(err, resp) {
    if (err) {
        console.log(err);
    } else {
        console.log(resp);
    }
})